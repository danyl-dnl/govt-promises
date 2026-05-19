const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'promises_list.txt'), 'utf8');
const lines = text.trim().split('\n');

const currentDataPath = path.join(__dirname, 'data', 'promises.json');
let currentData = [];
try {
  currentData = JSON.parse(fs.readFileSync(currentDataPath, 'utf8'));
} catch (e) {}

const sectorDefaults = {
  id: "s99",
  name: "General Manifesto",
  nameMl: "പൊതുവായ പ്രകടനപത്രിക",
  icon: "check-circle-2",
  color: "#64748B"
};

const newPromises = [];
let idCounter = 1;

lines.forEach(line => {
  const match = line.match(/^(\d+)\s+(.+)$/);
  if (!match) return;
  const num = match[1];
  const title = match[2].trim();
  
  // Try to find if an existing promise closely matches this one to preserve rich data
  const existing = currentData.find(p => p.title.toLowerCase() === title.toLowerCase() || p.title.toLowerCase().includes(title.toLowerCase().substring(0, 20)));
  
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + num; // Ensure uniqueness
  
  if (existing && !newPromises.find(p => p.id === existing.id)) {
    // We found a match and haven't used it yet
    newPromises.push({
      ...existing,
      id: 'p' + idCounter,
      slug: slug,
      title: title // Override with the exact title from the 58 list
    });
  } else {
    // Create a new simple promise
    newPromises.push({
      id: 'p' + idCounter,
      slug: slug,
      title: title,
      titleMl: title, // We don't have translations for all 58 right now
      description: title,
      manifestoQuote: title,
      sector: sectorDefaults,
      status: "pending",
      icon: "check-circle-2",
      sources: [],
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });
  }
  idCounter++;
});

// Write exactly the 58 promises
fs.writeFileSync(currentDataPath, JSON.stringify(newPromises, null, 2));
console.log(`Wrote ${newPromises.length} promises to database.`);
