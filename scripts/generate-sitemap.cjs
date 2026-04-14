const fs = require('fs');

async function generateSitemap() {
  const BASE_URL = 'https://dogsbreed.pages.dev';
  const API_URL = 'https://dog.ceo/api/breeds/list/all';

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const breeds = Object.keys(data.message);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Breed List Page -->
  <url>
    <loc>${BASE_URL}/breeds</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Favorites Page -->
  <url>
    <loc>${BASE_URL}/favorites</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

    // Add all breeds
    breeds.forEach(breed => {
      const slug = breed.toLowerCase().replace(/\s+/g, '-');
      sitemap += `  <url>
    <loc>${BASE_URL}/breed/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    });

    sitemap += '</urlset>';

    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log(`Sitemap generated successfully with ${breeds.length} breeds.`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
