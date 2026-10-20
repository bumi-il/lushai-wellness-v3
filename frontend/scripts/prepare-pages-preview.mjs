import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

// GitHub Pages does not rewrite client-side routes to index.html.
const output = resolve('dist');
const indexPath = join(output, 'index.html');
const html = await readFile(indexPath, 'utf8');
const previewHtml = html.replace(
    '</head>',
    '  <meta name="robots" content="noindex, nofollow" />\n</head>'
);

await writeFile(indexPath, previewHtml);
for (const route of ['contact', 'treatments', 'booking', 'about', 'privacy-policy']) {
    const directory = join(output, route);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'index.html'), previewHtml);
}
await copyFile(indexPath, join(output, '404.html'));
await writeFile(join(output, '.nojekyll'), '');
await writeFile(join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
await rm(join(output, 'sitemap.xml'), { force: true });
console.log('Pages preview prepared, including direct /contact/ links.');
