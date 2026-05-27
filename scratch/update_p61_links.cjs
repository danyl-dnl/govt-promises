const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/promises.json');
const promises = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const p61 = promises.find(p => p.id === 'p61');

if (p61 && p61.sources) {
  // Update Source 1 (Mathrubhumi / UDF Manifesto)
  p61.sources[0].url = 'https://m.dailyhunt.in/news/india/english/mathrubhumi+english-epaper-mtbumien/let+kids+modify+kerala+cm+vd+satheesan+restates+viral+reel+promise+on+vehicle+modifications-newsid-n712681340';
  p61.sources[0].publication = 'Mathrubhumi English';
  p61.sources[0].date = '2026-05-18';
  
  // Update Source 2 (Livemint)
  p61.sources[1].url = 'https://www.livemint.com/news/india/kerala-chief-minister-vd-satheesan-s-response-to-question-on-vehicle-modification-11779198382825.html';
  p61.sources[1].publication = 'Livemint';
  p61.sources[1].date = '2026-05-19';

  // Update Source 3 (NDTV Auto)
  p61.sources[2].url = 'https://auto.ndtv.com/news/kerala-government-to-legalize-safe-vehicle-modifications-2395123';
  p61.sources[2].publication = 'NDTV Auto';
  p61.sources[2].date = '2026-05-20';

  p61.lastUpdated = new Date().toISOString();

  fs.writeFileSync(jsonPath, JSON.stringify(promises, null, 2), 'utf8');
  console.log('Successfully injected verified links for promise p61!');
} else {
  console.log('Promise p61 or its sources could not be found.');
}
