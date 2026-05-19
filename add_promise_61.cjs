const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'promises.json');
let promises = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Check if p61 already exists
const hasP61 = promises.some(p => p.id === 'p61');

if (!hasP61) {
  const newPromise = {
    "id": "p61",
    "slug": "legalizing-safe-vehicle-modifications-61",
    "title": "Legalizing safe vehicle modifications",
    "titleMl": "സുരക്ഷിതമായ വാഹന രൂപമാറ്റങ്ങൾ നിയമവിധേയമാക്കൽ",
    "description": "Manifesto promised to permit non-hazardous vehicle customization. Chief Minister V.D. Satheesan reaffirmed the commitment right after the swearing-in ceremony, stating 'If we have promised to legalize, it will be done.'",
    "manifestoQuote": "Permit non-hazardous vehicle customization and relax Motor Vehicle Department (MVD) rules for non-dangerous structural or cosmetic modifications.",
    "sector": {
      "id": "s35",
      "name": "Youth & Transport",
      "nameMl": "യുവജനങ്ങളും ഗതാഗതവും",
      "icon": "hardhat",
      "color": "#F97316"
    },
    "status": "pending",
    "icon": "hardhat",
    "sources": [
      {
        "title": "UDF Manifesto Commitment: Vehicle modifications to be legalized",
        "url": "#",
        "publication": "Mathrubhumi / UDF Manifesto",
        "date": "2026-05-18",
        "tier": 2,
        "summary": "Manifesto promised to permit non-hazardous vehicle customization."
      },
      {
        "title": "CM VD Satheesan Reaffirms Safe Vehicle Customization Commitment",
        "url": "#",
        "publication": "Livemint",
        "date": "2026-05-19",
        "tier": 3,
        "summary": "Right after the swearing-in ceremony, CM V.D. Satheesan reaffirmed the commitment, stating: 'If we have promised to legalize, it will be done.'"
      },
      {
        "title": "Relaxing MVD Customization Rules: What UDF Government's Stance Means",
        "url": "#",
        "publication": "NDTV Auto",
        "date": "2026-05-20",
        "tier": 3,
        "summary": "Analysis of the promised changes to MVD guidelines for safe structural/cosmetic modifications."
      }
    ],
    "lastUpdated": new Date().toISOString(),
    "createdAt": new Date().toISOString()
  };

  promises.push(newPromise);
  fs.writeFileSync(dataPath, JSON.stringify(promises, null, 2));
  console.log("Successfully added promise p61: Legalizing safe vehicle modifications!");
} else {
  console.log("Promise p61 is already in the database.");
}
