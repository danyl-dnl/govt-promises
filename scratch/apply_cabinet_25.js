const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'promises.json');

if (!fs.existsSync(dataPath)) {
  console.error(`Error: File not found at ${dataPath}`);
  process.exit(1);
}

let promisesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let updated = false;

promisesData = promisesData.map(promise => {
  if (promise.id === 'p6') {
    const newSource = {
      title: "Kerala Cabinet approves Governor's address and drafts Senior Citizens Affairs department framework",
      url: "https://www.devdiscourse.com/article/politics/3050488-kerala-cabinet-approves-governors-policy-address",
      publication: "Devdiscourse / The Hindu",
      date: "2026-05-25",
      tier: 3,
      summary: "In a special cabinet meeting on May 25, 2026, CM V.D. Satheesan chaired discussions regarding shifting administrative subjects and responsibilities from the Social Justice Department to the newly formed Department for Senior Citizens Affairs."
    };

    const alreadyExists = promise.sources.some(s => s.url === newSource.url);
    if (!alreadyExists) {
      promise.sources.push(newSource);
      promise.lastUpdated = new Date().toISOString();
      updated = true;
      console.log(`Successfully appended May 25 cabinet update to p6.`);
    } else {
      console.log(`p6 already has the May 25 update, skipping.`);
    }
  }
  return promise;
});

if (updated) {
  fs.writeFileSync(dataPath, JSON.stringify(promisesData, null, 2), 'utf8');
  console.log(`Successfully saved updates to data/promises.json`);
} else {
  console.log(`No changes made to data/promises.json`);
}
