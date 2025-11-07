import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const hostname = 'https://first-ict.com';
const sitemap = new SitemapStream({ hostname });
const writeStream = createWriteStream('./public/sitemap.xml');

const pages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/products', changefreq: 'weekly', priority: 0.9 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/contents', changefreq: 'weekly', priority: 0.7 },
  { url: '/contact', changefreq: 'yearly', priority: 0.5 },
];

pages.forEach((page) =>
  sitemap.write({
    url: page.url,
    changefreq: page.changefreq,
    priority: page.priority,
    lastmod: new Date().toISOString(),
  })
);

sitemap.end();
streamToPromise(sitemap).then((xml) => {
  writeStream.write(xml.toString());
  console.log('Sitemap created successfully!');
});
