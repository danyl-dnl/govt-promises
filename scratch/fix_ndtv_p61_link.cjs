const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/promises.json');
const promises = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const p61 = promises.find(p => p.id === 'p61');

if (p61 && p61.sources && p61.sources[2]) {
  const oldUrl = p61.sources[2].url;
  const newUrl = 'https://www.ndtv.com/auto/car-enthusiasts-seek-action-on-kerala-leaders-vehicle-modification-legalisation-promise-11465992';
  
  p61.sources[2].url = newUrl;
  p61.sources[2].title = 'Relaxing MVD Customization Rules: What UDF Government\'s Stance Means';
  p61.sources[2].publication = 'NDTV Auto';
  
  p61.lastUpdated = new Date().toISOString();

  fs.writeFileSync(jsonPath, JSON.stringify(promises, null, 2), 'utf8');
  console.log(`Successfully updated NDTV Auto link for p61!`);
  console.log(`  Old: ${oldUrl}`);
  console.log(`  New: ${newUrl}`);
} else {
  console.log('p61 or its NDTV Auto source could not be found.');
}
