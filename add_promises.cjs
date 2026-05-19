const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'promises.json');
let promises = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Check if these IDs already exist
const hasP59 = promises.some(p => p.id === 'p59');
const hasP60 = promises.some(p => p.id === 'p60');

const newPromises = [];

if (!hasP59) {
  newPromises.push({
    "id": "p59",
    "slug": "financial-white-paper-on-keralas-economy-59",
    "title": "Financial White Paper on Kerala's Economy",
    "titleMl": "ധനകാര്യ ധവളപത്രം",
    "description": "On May 19, 2026, the Chief Minister chaired a high-level meeting with top finance officials and appointed an expert panel headed by former Cabinet Secretary K.M. Chandrasekhar. This study is the mandatory first step required before the UDF can budget money for its expensive social promises or mathematically dismantle the K-Rail SilverLine project.",
    "manifestoQuote": "Publish a comprehensive Financial White Paper on Kerala's Economy to assess the state's fiscal health.",
    "sector": {
      "id": "s32",
      "name": "Governance",
      "nameMl": "ഭരണം",
      "icon": "landmark",
      "color": "#374151"
    },
    "status": "in-progress",
    "icon": "landmark",
    "sources": [
      {
        "title": "CM VD Satheesan Appoints Panel Under KM Chandrasekhar for Economic White Paper",
        "url": "https://www.thehindu.com/news/national/kerala/kerala-cabinet-economic-white-paper-2026",
        "publication": "The Hindu / Mathrubhumi",
        "date": "2026-05-19",
        "tier": 3,
        "summary": "On May 19, 2026, the Chief Minister chaired a high-level meeting with top finance officials and appointed an expert panel headed by former Cabinet Secretary K.M. Chandrasekhar to prepare a comprehensive white paper on the state's finances."
      }
    ],
    "lastUpdated": new Date().toISOString(),
    "createdAt": new Date().toISOString()
  });
}

if (!hasP60) {
  newPromises.push({
    "id": "p60",
    "slug": "honorarium-hike-for-pre-primary-school-teachers-and-ayahs-60",
    "title": "Honorarium hike for pre-primary school teachers and ayahs",
    "titleMl": "പ്രീ-പ്രൈമറി അധ്യാപകർക്കും ആയാമാർക്കും ഓണറേറിയം വർദ്ധനവ്",
    "description": "During the inaugural Cabinet meet on May 18, this group was officially grouped alongside school midday meal cooks to receive an immediate ₹1,000 monthly honorarium hike.",
    "manifestoQuote": "Revise wages and honorarium for pre-primary school teachers and ayahs across the state.",
    "sector": {
      "id": "s16",
      "name": "Labour",
      "nameMl": "തൊഴിൽ",
      "icon": "briefcase",
      "color": "#7C3AED"
    },
    "status": "in-progress",
    "icon": "briefcase",
    "sources": [
      {
        "title": "Kerala Govt Announces ₹1,000 Honorarium Hike for Pre-Primary Teachers & Ayahs",
        "url": "https://timesofindia.indiatimes.com/city/thiruvananthapuram/kerala-govt-pre-primary-honorarium-hike-2026",
        "publication": "Times of India / Onmanorama",
        "date": "2026-05-18",
        "tier": 3,
        "summary": "During the inaugural UDF Cabinet meet on May 18, pre-primary school teachers and ayahs were officially grouped alongside midday meal cooks to receive an immediate ₹1,000 monthly honorarium hike."
      }
    ],
    "lastUpdated": new Date().toISOString(),
    "createdAt": new Date().toISOString()
  });
}

if (newPromises.length > 0) {
  promises.push(...newPromises);
  fs.writeFileSync(dataPath, JSON.stringify(promises, null, 2));
  console.log(`Successfully added ${newPromises.length} new in-progress promises!`);
} else {
  console.log("Both promises p59 and p60 are already in the database.");
}
