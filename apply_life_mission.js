const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'promises.json');

// Check if file exists
if (!fs.existsSync(dataPath)) {
  console.error(`Error: File not found at ${dataPath}`);
  process.exit(1);
}

// Read the existing promises.json
let promisesData;
try {
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  promisesData = JSON.parse(fileContent);
} catch (e) {
  console.error(`Error reading/parsing JSON file:`, e);
  process.exit(1);
}

let updated = false;

// Modify promise p42
promisesData = promisesData.map(promise => {
  if (promise.id === 'p42') {
    promise.status = 'in-progress';
    
    const newSource = {
      title: 'Kerala Government will not scrap LIFE Mission, says LSGD Minister K. M. Shaji',
      url: 'https://www.newindianexpress.com/states/kerala/2026/may/25/kerala-government-not-scrapping-life-mission',
      publication: 'The New Indian Express / The Hindu',
      date: '2026-05-25',
      tier: 3,
      summary: 'LSGD Minister K. M. Shaji clarified that the newly elected UDF government has no plans to scrap the LIFE Mission housing project. Instead, the government will reform the scheme by restoring and strengthening the powers of grama panchayats and grama sabhas to select beneficiaries, aligning with the principles of Gandhian Gram Swaraj.'
    };
    
    // Check if source already exists to avoid duplication if run multiple times
    const alreadyExists = promise.sources.some(s => s.url === newSource.url);
    if (!alreadyExists) {
      promise.sources.push(newSource);
    }
    
    promise.lastUpdated = new Date().toISOString();
    updated = true;
    console.log(`Updated promise p42 status to 'in-progress' and appended the news source.`);
  }
  return promise;
});

if (updated) {
  // Write the updated array back to promises.json
  try {
    fs.writeFileSync(dataPath, JSON.stringify(promisesData, null, 2), 'utf8');
    console.log(`Successfully saved updates to data/promises.json`);
  } catch (e) {
    console.error(`Error writing updates to file:`, e);
    process.exit(1);
  }
} else {
  console.warn(`Warning: Promise p42 was not found in data/promises.json`);
}
