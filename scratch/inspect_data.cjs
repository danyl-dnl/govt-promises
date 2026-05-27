const fs = require('fs');
const path = require('path');

const promisesPath = path.join(__dirname, '..', 'data', 'promises.json');
const fileContent = fs.readFileSync(promisesPath, 'utf8');
const promises = JSON.parse(fileContent);

console.log(`Total promises in JSON: ${promises.length}`);

let totalSources = 0;
let placeholderSources = 0;
let externalSources = 0;
const uniqueUrls = new Set();
const placeholderCounts = {};

promises.forEach(p => {
  if (p.sources && Array.isArray(p.sources)) {
    totalSources += p.sources.length;
    p.sources.forEach(s => {
      if (s.url === '#') {
        placeholderSources++;
        placeholderCounts[p.id] = (placeholderCounts[p.id] || 0) + 1;
      } else if (s.url) {
        externalSources++;
        uniqueUrls.add(s.url);
      }
    });
  }
});

console.log(`Total sources: ${totalSources}`);
console.log(`Placeholder sources ("#"): ${placeholderSources}`);
console.log(`External sources (non-"#"): ${externalSources}`);
console.log(`Unique external URLs: ${uniqueUrls.size}`);
console.log(`Unique external URLs list:`, Array.from(uniqueUrls));
