const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'promises.json');
const promises = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const labourPromises = promises.filter(p => p.sector.id === 's16');

console.log(JSON.stringify(labourPromises.map(p => ({
  id: p.id,
  title: p.title,
  status: p.status
})), null, 2));
