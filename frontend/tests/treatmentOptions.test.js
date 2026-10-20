import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getPairingLabel, getTreatmentOptions } from '../src/utils/treatmentOptions.js';

test('pairs each massage duration with its corresponding price', () => {
    assert.deepEqual(getTreatmentOptions({ duration: '60 / 90 minutes', price: '2500 / 3500' }), [
        { duration: '60 min', price: '₹2,500' },
        { duration: '90 min', price: '₹3,500' },
    ]);
});

test('formats a single duration and price without changing their value', () => {
    assert.deepEqual(getTreatmentOptions({ duration: '120 minutes', price: '6500' }), [
        { duration: '120 min', price: '₹6,500' },
    ]);
});

test('falls back instead of inventing options for mismatched or unsupported data', () => {
    for (const treatment of [
        { duration: '60 / 90 minutes', price: '2500' },
        { duration: 'one hour', price: '2500' },
        { duration: '60 minutes', price: 'on request' },
        { duration: '0 minutes', price: '500' },
        { duration: '60 minutes', price: '-500' },
        {},
    ]) assert.equal(getTreatmentOptions(treatment), null);
});

test('every existing catalog duration and amount is preserved by option formatting', async () => {
    const categories = JSON.parse(await readFile(new URL('../src/data/treatments_list_v2.json', import.meta.url), 'utf8'));
    const numberFormat = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
    for (const category of categories) {
        for (const treatment of category.treatments) {
            const snapshot = JSON.stringify(treatment);
            const options = getTreatmentOptions(treatment);
            assert.ok(options, treatment.name);
            const prices = treatment.price.split('/').map((price) => Number(price.trim()));
            const durations = treatment.duration.match(/\d+/g).map(Number);
            assert.equal(options.length, prices.length, treatment.name);
            for (let index = 0; index < options.length; index += 1) {
                assert.equal(options[index].duration, numberFormat.format(durations[index]) + ' min', treatment.name);
                assert.equal(options[index].price, '₹' + numberFormat.format(prices[index]), treatment.name);
            }
            assert.equal(JSON.stringify(treatment), snapshot);
        }
    }
});

test('explains add-on restrictions and preserves unknown pairing notes', () => {
    assert.equal(getPairingLabel('facials'), 'Facial treatments');
    assert.equal(getPairingLabel('serene skin: only scrub and wrap'), 'Serene Skin scrubs and wraps only');
    assert.equal(getPairingLabel('future pairing rule'), 'future pairing rule');
});
