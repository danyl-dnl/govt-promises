const fs = require('fs');
const path = require('path');

const promisesPath = path.join(__dirname, '..', 'data', 'promises.json');

try {
  const fileContent = fs.readFileSync(promisesPath, 'utf8');
  const promises = JSON.parse(fileContent);
  console.log(`JSON is valid. Total promises: ${promises.length}`);

  let totalSources = 0;
  let placeholderCount = 0;
  let updatedCount = 0;
  const uniqueUrls = new Set();

  promises.forEach(p => {
    if (p.sources && Array.isArray(p.sources)) {
      totalSources += p.sources.length;
      p.sources.forEach(s => {
        if (s.url === '#') {
          placeholderCount++;
        } else if (s.url === 'https://www.onmanorama.com/news/kerala/2026/04/02/udf-manifesto-released-kerala-assembly-polls.html') {
          updatedCount++;
          uniqueUrls.add(s.url);
        } else if (s.url) {
          uniqueUrls.add(s.url);
        }
      });
    }
  });

  console.log(`Total sources: ${totalSources}`);
  console.log(`Placeholders left: ${placeholderCount}`);
  console.log(`Updated manifesto sources (new URL): ${updatedCount}`);
  console.log(`Unique URLs overall: ${uniqueUrls.size}`);
  console.log(`Unique URLs:`, Array.from(uniqueUrls));
} catch (e) {
  console.error('Error reading or parsing updated JSON file:', e);
}
