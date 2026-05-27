const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/promises.json');
const promises = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const mockUrls = [
  'https://indianexpress.com/article/cities/thiruvananthapuram/kerala-udf-govt-free-bus-travel-women-june-15-2026',
  'https://www.thehindu.com/news/national/kerala/kerala-welfare-pension-may-disbursement-2026',
  'https://www.thehindu.com/news/national/kerala/kerala-cabinet-approves-welfare-measures-2026',
  'https://www.onmanorama.com/news/kerala/2026/05/25/kerala-udf-govt-vision-2031-roadmap-pensions.html',
  'https://www.newindianexpress.com/states/kerala/2026/may/19/kerala-cabinet-asha-workers-honorarium-hike',
  'https://www.newindianexpress.com/states/kerala/2026/may/19/anganwadi-wage-hike-kerala',
  'https://timesofindia.indiatimes.com/city/thiruvananthapuram/kerala-govt-pre-primary-honorarium-hike-2026',
  'https://www.newindianexpress.com/states/kerala/2026/may/25/kerala-government-not-scrapping-life-mission',
  'https://www.onmanorama.com/news/kerala/2026/05/20/kerala-cabinet-decides-to-scrap-controversial-silverline-rail-project.html',
  'https://www.onmanorama.com/news/kerala/2026/05/25/kerala-revenue-department-cancels-silverline-land-acquisition-notifications.html',
  'https://www.thehindu.com/news/national/kerala/kerala-cabinet-economic-white-paper-2026'
];

console.log('Searching for mock URLs...');
let foundCount = 0;

promises.forEach(p => {
  if (p.sources) {
    p.sources.forEach(s => {
      if (mockUrls.includes(s.url)) {
        foundCount++;
        console.log(`Found mock URL in promise ${p.id} ("${p.title}"):`);
        console.log(`  Source: "${s.title}"`);
        console.log(`  URL:    ${s.url}`);
        console.log('-----------------------------------------');
      }
    });
  }
});

console.log(`Total occurrences found: ${foundCount}`);
