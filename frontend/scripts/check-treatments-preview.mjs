import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as pause } from 'node:timers/promises';
import { chromium } from 'playwright';

const base = '/' + (process.env.REPOSITORY_NAME || 'lushai-wellness-v3') + '/';
const origin = 'http://127.0.0.1:4173';
const url = origin + base;
const server = spawn(process.execPath, [
    'node_modules/vite/bin/vite.js', 'preview', '--base', base,
    '--host', '127.0.0.1', '--port', '4173', '--strictPort',
], { stdio: 'inherit' });
let browser;
let page;
const report = [];
const verify = (name, condition) => { assert.ok(condition, name); report.push(name); };
try {
    let ready = false;
    for (let index = 0; index < 60; index += 1) {
        if (server.exitCode !== null) throw new Error('Preview server exited before becoming ready.');
        try { ready = (await fetch(url + 'treatments/')).ok; } catch { /* Wait for Vite. */ }
        if (ready) break;
        await pause(250);
    }
    assert.ok(ready, 'Vite preview server is ready');
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    // Keep the test isolated: no map tiles, webhooks, or other external requests.
    await page.route(/^https?:\/\//, (route) => {
        if (new URL(route.request().url()).origin === origin) return route.continue();
        return route.abort();
    });
    await page.goto(url + 'treatments/', { waitUntil: 'networkidle' });
    verify('All 24 treatments render', await page.locator('.treatment-row').count() === 24);
    verify('All seven category links render', await page.locator('.treatments-category-links a').count() === 7);
    verify('The page has one accessible main heading', await page.getByRole('heading', { level: 1 }).count() === 1);
    const aromatic = page.locator('.treatment-row').filter({ has: page.getByRole('heading', { name: 'Aromatic Relaxation', exact: true }) });
    verify('60 minutes is paired with ₹2,500', (await aromatic.locator('.treatment-option').nth(0).innerText()).replace(/\s+/g, ' ').includes('60 min ₹2,500'));
    verify('90 minutes is paired with ₹3,500', (await aromatic.locator('.treatment-option').nth(1).innerText()).replace(/\s+/g, ' ').includes('90 min ₹3,500'));
    verify('Package inclusions are visible', await page.getByText('90 min massage + 30 min facial', { exact: false }).count() === 1);
    verify('Facial add-on restrictions are visible', await page.getByText('Facial treatments', { exact: false }).count() === 2);
    verify('Add-ons cannot be booked on their own', await page.locator('.treatment-row[data-treatment-type="add-on"] a').count() === 0);
    await mkdir('test-results', { recursive: true });
    for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        verify('No document overflow at ' + width + 'px', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        if (width === 390 || width === 1440) {
            await page.evaluate(() => scrollTo(0, 0));
            await page.screenshot({ path: 'test-results/treatments-' + width + '.png', fullPage: false });
        }
    }
    const nav = page.getByRole('navigation', { name: 'Treatment categories' });
    await nav.getByRole('link', { name: 'Lushai Packages', exact: true }).click();
    await page.waitForFunction(() => {
        const section = document.getElementById('lushai-packages');
        const navigation = document.querySelector('.treatments-category-nav');
        return section.getBoundingClientRect().top >= navigation.getBoundingClientRect().bottom &&
            section.getBoundingClientRect().top <= navigation.getBoundingClientRect().bottom + 30;
    });
    verify('Category selection updates the shareable URL', page.url().endsWith('#lushai-packages'));
    verify('The selected category has an accessible current state', await nav.getByRole('link', { name: 'Lushai Packages', exact: true }).getAttribute('aria-current') === 'location');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    verify('Keyboard focus has a visible indicator', await nav.getByRole('link', { name: 'Lushai Packages', exact: true }).evaluate((element) =>
        document.activeElement === element && getComputedStyle(element).outlineStyle !== 'none'
    ));
    await page.goto(url + 'treatments/#serene-skin', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => {
        const top = document.getElementById('serene-skin').getBoundingClientRect().top;
        return top >= 144 && top <= 175;
    });
    verify('Direct category links work after a reload', page.url().endsWith('#serene-skin'));
    await nav.getByRole('link', { name: 'Lushai Packages', exact: true }).click();
    await page.goBack();
    await page.waitForFunction(() => {
        const top = document.getElementById('serene-skin').getBoundingClientRect().top;
        return top >= 144 && top <= 175;
    });
    verify('Back navigation restores the category', page.url().endsWith('#serene-skin'));
    await page.getByRole('link', { name: 'Book Aromatic Relaxation', exact: true }).click();
    await page.waitForURL(url + 'booking');
    verify('Booking stays on the existing route', await page.getByRole('link', { name: 'Continue to Booking', exact: true }).getAttribute('href') === 'https://www.welns.io/product/booking/WFRCHN469741/lushaiwellness');
    await page.goto(url + 'contact/', { waitUntil: 'networkidle' });
    verify('The Contact redesign remains available', await page.getByRole('heading', { name: 'A moment to connect.', exact: true }).count() === 1);
    verify('The existing contact form remains available', await page.getByLabel('Email address', { exact: false }).count() === 1);
    verify('The interactive contact map still mounts', await page.locator('.contact-map .leaflet-container').count() === 1);
    assert.deepEqual(errors, [], 'No browser runtime errors');
    report.push('No browser runtime errors');
    await writeFile('test-results/checks.json', JSON.stringify({ passed: report, errors }, null, 2));
    console.log('Browser checks passed:', report.length);
} catch (error) {
    if (page) {
        await mkdir('test-results', { recursive: true });
        await page.screenshot({ path: 'test-results/failure.png' }).catch(() => {});
    }
    throw error;
} finally {
    await browser?.close();
    server.kill();
}
