const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'promises.json');
let promisesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let updatedCount = 0;

promisesData = promisesData.map(promise => {
  if (promise.id === 'p48') {
    promise.status = 'in-progress';
    promise.sources = [
      {
        "title": "Kerala Cabinet Orders Removal of SilverLine Stones and Land Denotification",
        "url": "https://www.onmanorama.com/news/kerala/2026/05/20/kerala-cabinet-decides-to-scrap-controversial-silverline-rail-project.html",
        "publication": "Onmanorama",
        "date": "2026-05-20",
        "tier": 3,
        "summary": "Following the cabinet meeting on May 20, 2026, the Kerala government ordered the Revenue Department to denotify all land acquisition orders related to the K-Rail SilverLine project and remove all installed survey demarcation stones."
      }
    ];
    promise.lastUpdated = new Date().toISOString();
    updatedCount++;
  } else if (promise.id === 'p49') {
    promise.status = 'fulfilled';
    promise.sources = [
      {
        "title": "Kerala Cabinet Decides to Scrap Controversial SilverLine Rail Project",
        "url": "https://www.onmanorama.com/news/kerala/2026/05/20/kerala-cabinet-decides-to-scrap-controversial-silverline-rail-project.html",
        "publication": "Onmanorama",
        "date": "2026-05-20",
        "tier": 3,
        "summary": "On May 20, 2026, the Kerala Cabinet officially scrapped the SilverLine (K-Rail) project due to lack of central government clearance and strong public protests, effectively fulfilling the manifesto commitment."
      }
    ];
    promise.lastUpdated = new Date().toISOString();
    updatedCount++;
  }
  return promise;
});

fs.writeFileSync(dataPath, JSON.stringify(promisesData, null, 2));
console.log(`Successfully updated ${updatedCount} SilverLine promises.`);
