const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'new_raw_promises.json');
const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const outPath = path.join(__dirname, 'data', 'promises.json');

// Map categories to standard sectors
const sectorMap = {};
let sectorCounter = 1;

function getSector(category) {
  if (!sectorMap[category]) {
    sectorMap[category] = {
      id: 's' + sectorCounter++,
      name: category,
      nameMl: category,
      icon: getIconForCategory(category),
      color: getColorForCategory(category)
    };
  }
  return sectorMap[category];
}

function getIconForCategory(cat) {
  const l = cat.toLowerCase();
  if (l.includes('women') || l.includes('youth') || l.includes('citizen')) return 'users';
  if (l.includes('health')) return 'heart-pulse';
  if (l.includes('welfare') || l.includes('poverty') || l.includes('security')) return 'shield-check';
  if (l.includes('education') || l.includes('student')) return 'graduation-cap';
  if (l.includes('employment') || l.includes('labour')) return 'briefcase';
  if (l.includes('agriculture') || l.includes('farmer') || l.includes('rubber') || l.includes('coconut') || l.includes('paddy')) return 'tractor';
  if (l.includes('food')) return 'wheat';
  if (l.includes('housing')) return 'home';
  if (l.includes('transport') || l.includes('aviation') || l.includes('rail') || l.includes('maritime') || l.includes('infrastructure')) return 'building';
  if (l.includes('governance')) return 'landmark';
  if (l.includes('industry')) return 'factory';
  if (l.includes('wildlife')) return 'paw-print';
  return 'check-circle-2';
}

function getColorForCategory(cat) {
  const l = cat.toLowerCase();
  if (l.includes('women') || l.includes('welfare') || l.includes('poverty') || l.includes('security') || l.includes('food')) return '#2563EB'; // UDF Blue
  if (l.includes('health')) return '#15803D'; // Green
  if (l.includes('agriculture') || l.includes('farmer') || l.includes('rubber') || l.includes('coconut') || l.includes('paddy') || l.includes('wildlife')) return '#16A34A'; // Light Green
  if (l.includes('education') || l.includes('student')) return '#0284C7'; // Blue variant
  if (l.includes('employment') || l.includes('labour')) return '#9333EA'; // Purple
  if (l.includes('housing')) return '#D97706'; // Amber
  if (l.includes('transport') || l.includes('aviation') || l.includes('rail') || l.includes('maritime') || l.includes('infrastructure') || l.includes('industry')) return '#64748B'; // Slate
  return '#475569';
}

const formattedData = rawData.map((item, index) => {
  const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + (index + 1);
  
  const statusStr = item.status.toLowerCase().replace(' ', '-');
  const finalStatus = ['pending', 'in-progress', 'fulfilled', 'evaded'].includes(statusStr) ? statusStr : 'pending';

  return {
    id: 'p' + (index + 1),
    slug: slug,
    title: item.title,
    titleMl: item.title, // No ML provided in new dataset
    description: item.promise,
    trackingNote: item.tracking_note || null,
    manifestoQuote: item.promise,
    sector: getSector(item.category),
    status: finalStatus,
    icon: getIconForCategory(item.category),
    sources: [
      {
        title: "Initial Manifesto Commitment",
        url: "#",
        publication: "UDF Manifesto / Media Report",
        date: "2026-05-18",
        tier: 2,
        summary: item.source_basis || item.promise
      }
    ],
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
});

fs.writeFileSync(outPath, JSON.stringify(formattedData, null, 2));
console.log(`Successfully converted ${formattedData.length} promises.`);
