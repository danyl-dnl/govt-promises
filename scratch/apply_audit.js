const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'promises.json');
let promises = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Correct Malayalam titles for p11-p47, p50-p58
const titleMlCorrections = {
  "p11": "സൗജന്യ റേഷൻ പദ്ധതി",
  "p12": "നവ ആശ്രയ പദ്ധതി",
  "p13": "ഏറ്റവും ദുർബല വിഭാഗങ്ങൾക്കുള്ള പിന്തുണ",
  "p14": "മഞ്ഞ, പിങ്ക് റേഷൻ കാർഡ് ഉടമകൾക്കായി പ്രത്യേക പദ്ധതി",
  "p15": "യുവശക്തി നാടിൻ സമ്പത്ത് പദ്ധതി",
  "p16": "യുവശ്രീ കൂട്ടായ്മകൾ",
  "p17": "കെ. ആർ. നാരായണൻ സ്കോളർഷിപ്പ്",
  "p18": "ഉന്നത വിദ്യാഭ്യാസ വായ്പാ സഹായം",
  "p19": "ബി.പി.എൽ കുടുംബങ്ങൾക്ക് സൗജന്യ ഡയാലിസിസ്",
  "p20": "സ്ത്രീകൾക്കായുള്ള ഷി (SHE) ആശുപത്രികൾ",
  "p21": "ആദിവാസി മേഖലകളിൽ ആരോഗ്യ കേന്ദ്രങ്ങൾ",
  "p22": "തീരദേശ മേഖലകളിൽ ആരോഗ്യ കേന്ദ്രങ്ങൾ",
  "p23": "നോ-ബിൽ ആശുപത്രികൾ",
  "p24": "ആദിവാസി ആരോഗ്യ ക്ലസ്റ്ററുകൾ",
  "p25": "ആശ വർക്കർമാരുടെ വേതന/ഓണറേറിയം വർദ്ധനവ്",
  "p26": "അങ്കണവാടി ജീവനക്കാരുടെ വേതന പരിഷ്കരണം",
  "p27": "സ്കൂൾ പാചകക്കാരുടെ വേതന പരിഷ്കരണം",
  "p28": "സ്കീം തൊഴിലാളികൾക്കുള്ള ആനുകൂല്യങ്ങൾ",
  "p29": "പ്രത്യേക കാർഷിക ബജറ്റ്",
  "p30": "സ്വാമിനാഥൻ കമ്മീഷൻ ശുപാർശകൾ നടപ്പിലാക്കൽ",
  "p31": "റബ്ബറിന് ₹300 തറവില",
  "p32": "CIAL മാതൃകയിൽ റബ്ബർ കമ്പനി",
  "p33": "നെല്ലിന്റെ സംഭരണവില കിലോയ്ക്ക് ₹35 ആക്കൽ",
  "p34": "കർഷകർക്ക് നെല്ല് സംഭരണ തുക നേരിട്ട് നൽകൽ",
  "p35": "തേങ്ങയുടെ തറവില വർദ്ധിപ്പിക്കൽ",
  "p36": "കരിക്ക് സംഭരണ കേന്ദ്രങ്ങൾ",
  "p37": "നാണ്യവിളകളെ കാർഷിക വിളകളുടെ പരിധിയിൽ കൊണ്ടുവരൽ",
  "p38": "കുടിയേറ്റ കർഷകരുടെ ഭൂമി പ്രശ്നങ്ങൾ പരിഹരിക്കൽ",
  "p39": "വന്യജീവി ആക്രമണ മുന്നറിയിപ്പിന് എ.ഐ/ഡ്രോൺ/ഐ.ഓ.ടി സാങ്കേതികവിദ്യ",
  "p40": "വന്യജീവി ആക്രമണ മരണങ്ങൾക്കുള്ള നഷ്ടപരിഹാരം 50% വർദ്ധിപ്പിക്കൽ",
  "p41": "അഞ്ച് വർഷത്തിനുള്ളിൽ അഞ്ച് ലക്ഷം വീടുകൾ",
  "p42": "ലൈഫ് മിഷൻ പദ്ധതി പുനഃപരിശോധിക്കുകയോ പരിഷ്കരിക്കുകയോ ചെയ്യൽ",
  "p43": "മിഷൻ സമുദ്ര",
  "p44": "സംയോജിത ജലഗതാഗത ശൃംഖല",
  "p45": "കേന്ദ്ര സർക്കാരുമായി ചേർന്ന് അതിവേഗ റെയിൽ ഇടനാഴി",
  "p46": "തിരുവനന്തപുരത്ത് മെട്രോ/ലൈറ്റ് മെട്രോ പദ്ധതി",
  "p47": "കോഴിക്കോട്ട് മെട്രോ/ലൈറ്റ് മെട്രോ പദ്ധതി",
  "p50": "സമഗ്ര വ്യോമയാന പദ്ധതി",
  "p51": "കൊച്ചി വിമാനത്താവളത്തിൽ രണ്ടാം റൺവേ",
  "p52": "കണ്ണൂർ വിമാനത്താവള ടെർമിനലും ഏപ്രണും വികസിപ്പിക്കൽ",
  "p53": "എം.ആർ.ഓ (മെയിന്റനൻസ്, റിപ്പയർ & ഓവർഹോൾ) കേന്ദ്രങ്ങൾ",
  "p54": "റൂട്ട് ഡെവലപ്‌മെന്റ് ആൻഡ് കണക്റ്റിവിറ്റി ഫണ്ട്",
  "p55": "വയനാട് ട്രൈബൽ യൂണിവേഴ്സിറ്റി",
  "p56": "സ്വതന്ത്ര സംസ്ഥാന വിജിലൻസ് കമ്മീഷൻ",
  "p57": "എ.ഐ അധിഷ്ഠിത ഓഡിറ്റിംഗ് ഉപകരണങ്ങൾ",
  "p58": "പതിനായിരം സംരംഭങ്ങൾ ആരംഭിക്കൽ"
};

// 2. Correct Sector Malayalam Names
const sectorMlCorrections = {
  "s9": "ദാരിദ്ര്യ നിർമ്മാർജ്ജനം",
  "s10": "യുവജനക്ഷേമം",
  "s11": "യുവജനങ്ങളും കൂട്ടായ്മയും",
  "s12": "വിദ്യഭ്യാസം", // Let's use വിദ്യാഭ്യാസം
  "s13": "ആരോഗ്യവും സ്ത്രീകളും",
  "s14": "ആരോഗ്യവും ഗോത്രവർഗ്ഗ ക്ഷേമവും",
  "s15": "ആരോഗ്യവും തീരദേശ ക്ഷേമവും",
  "s16": "തൊഴിൽ",
  "s17": "കൃഷി",
  "s18": "കൃഷിയും റബ്ബറും",
  "s19": "കൃഷിയും നെല്ലും",
  "s20": "കൃഷിയും നാളികേരവും",
  "s21": "കർഷകരും ഭൂമിയും",
  "s22": "വന്യജീവി ആക്രമണം",
  "s23": "ഭവനനിർമ്മാണം",
  "s24": "സമുദ്ര സമ്പദ്‌വ്യവസ്ഥ",
  "s25": "ജലഗതാഗതം",
  "s26": "റെയിൽ അടിസ്ഥാന സൗകര്യങ്ങൾ",
  "s27": "നഗര ഗതാഗതം",
  "s29": "വ്യോമയാനം",
  "s30": "വ്യോമയാനവും വ്യവസായവും",
  "s31": "വിദ്യഭ്യാസവും ഗോത്രവർഗ്ഗ ക്ഷേമവും", // Let's use വിദ്യാഭ്യാസവും...
  "s32": "ഭരണം",
  "s33": "ഭരണവും സാങ്കേതികവിദ്യയും",
  "s34": "വ്യവസായവും തൊഴിലും"
};

// Make sure to use clean spelling for education
sectorMlCorrections["s12"] = "വിദ്യാഭ്യാസം";
sectorMlCorrections["s31"] = "വിദ്യാഭ്യാസവും ഗോത്രവർഗ്ഗ ക്ഷേമവും";

// Apply corrections to existing promises
promises.forEach(p => {
  // Correct promise titleMl
  if (titleMlCorrections[p.id]) {
    p.titleMl = titleMlCorrections[p.id];
  }
  
  // Correct sector nameMl
  if (p.sector && sectorMlCorrections[p.sector.id]) {
    p.sector.nameMl = sectorMlCorrections[p.sector.id];
  }
});

// 3. Define the 6 missing promises
const nowStr = new Date().toISOString();

const newPromises = [
  {
    "id": "p65",
    "slug": "kerala-farmer-income-guarantee-scheme-65",
    "title": "Kerala Farmer Income Guarantee Scheme",
    "titleMl": "കേരള കർഷക വരുമാന ഉറപ്പ് പദ്ധതി",
    "description": "Establish the Kerala Farmer Income Guarantee scheme to ensure a minimum monthly income support of ₹12,000 to all eligible small and marginal farmers across the state.",
    "trackingNote": "Monitor the scheme notification, eligibility guidelines, initial registrations, budget outlays, and first direct benefit transfer (DBT) rolls.",
    "manifestoQuote": "Introduce the Kerala Farmer Income Guarantee Scheme, securing a minimum monthly livelihood support of ₹12,000 for our hard-working farming households.",
    "sector": {
      "id": "s17",
      "name": "Agriculture",
      "nameMl": "കൃഷി",
      "icon": "tractor",
      "color": "#16A34A"
    },
    "status": "pending",
    "icon": "tractor",
    "sources": [
      {
        "title": "Initial Manifesto Commitment",
        "url": "#",
        "publication": "UDF Manifesto / Media Report",
        "date": "2026-05-18",
        "tier": 2,
        "summary": "UDF 2026 manifesto / Agriculture Guarantees."
      }
    ],
    "lastUpdated": nowStr,
    "createdAt": nowStr
  },
  {
    "id": "p66",
    "slug": "sidharthan-anti-ragging-and-student-welfare-act-66",
    "title": "Sidharthan Anti-Ragging and Student Welfare Act",
    "titleMl": "സിദ്ധാർത്ഥൻ ആന്റി റാഗിംഗ് ആൻഡ് സ്റ്റുഡന്റ് വെൽഫെയർ ആക്റ്റ്",
    "description": "Enact a comprehensive student welfare legislation named after J.S. Sidharthan (the 20-year-old student who died following brutal campus ragging in Wayanad) to enforce strict anti-ragging measures and secure student campuses.",
    "trackingNote": "Track the draft bill drafting, introduction in the Kerala Legislative Assembly, passage, Governor assent, and MVD/University rule updates.",
    "manifestoQuote": "Enact the Sidharthan Anti-Ragging and Student Welfare Act to structurally reform campus safety and put a permanent, legally binding end to campus violence and ragging.",
    "sector": {
      "id": "s12",
      "name": "Education",
      "nameMl": "വിദ്യാഭ്യാസം",
      "icon": "graduation-cap",
      "color": "#0284C7"
    },
    "status": "pending",
    "icon": "graduation-cap",
    "sources": [
      {
        "title": "Initial Manifesto Commitment",
        "url": "#",
        "publication": "UDF Manifesto / Media Report",
        "date": "2026-05-18",
        "tier": 2,
        "summary": "UDF 2026 manifesto campus welfare reform."
      }
    ],
    "lastUpdated": nowStr,
    "createdAt": nowStr
  },
  {
    "id": "p67",
    "slug": "rohith-vemula-act-67",
    "title": "Rohith Vemula Act",
    "titleMl": "രോഹിത് വെമുല നിയമം",
    "description": "Enact the Rohith Vemula Act in higher education institutions to address and combat caste-based discrimination, bias, and institutional inequality against students from marginalized communities.",
    "trackingNote": "Track bill introduction, legislative debates, assembly approvals, and rules regarding the establishment of grievance redressal cells.",
    "manifestoQuote": "Introduce the Rohith Vemula Act to systematically stamp out caste discrimination and institutional bias on higher education campuses.",
    "sector": {
      "id": "s12",
      "name": "Education",
      "nameMl": "വിദ്യാഭ്യാസം",
      "icon": "graduation-cap",
      "color": "#0284C7"
    },
    "status": "pending",
    "icon": "graduation-cap",
    "sources": [
      {
        "title": "Initial Manifesto Commitment",
        "url": "#",
        "publication": "UDF Manifesto / Media Report",
        "date": "2026-05-18",
        "tier": 2,
        "summary": "UDF 2026 manifesto student rights reform."
      }
    ],
    "lastUpdated": nowStr,
    "createdAt": nowStr
  },
  {
    "id": "p68",
    "slug": "ammawadi-project-for-elderly-women-68",
    "title": "Ammawadi Project for Elderly Women",
    "titleMl": "അമ്മവാടി പദ്ധതി",
    "description": "Introduce the \"Ammawadi\" project specifically aimed at the social security, healthcare, housing, and general welfare of elderly women in Kerala.",
    "trackingNote": "Track project guidelines, local body fund distributions, care facility constructions, and beneficiary lists.",
    "manifestoQuote": "Launch the Ammawadi Project to provide comprehensive social protection, nutrition, and specialized care to aged and vulnerable women.",
    "sector": {
      "id": "s6",
      "name": "Senior Citizens",
      "nameMl": "മുതിർന്ന പൗരന്മാർ",
      "icon": "users",
      "color": "#475569"
    },
    "status": "pending",
    "icon": "users",
    "sources": [
      {
        "title": "Initial Manifesto Commitment",
        "url": "#",
        "publication": "UDF Manifesto / Media Report",
        "date": "2026-05-18",
        "tier": 2,
        "summary": "UDF 2026 manifesto elderly protection project."
      }
    ],
    "lastUpdated": nowStr,
    "createdAt": nowStr
  },
  {
    "id": "p69",
    "slug": "job-watch-tower-69",
    "title": "Job Watch Tower for Global Placements",
    "titleMl": "ജോബ് വാച്ച് ടവർ",
    "description": "Establish a state-level \"Job Watch Tower\" to track real-time global employment trends and shifting skill requirements in the international job market, aligning the state's higher education curriculum accordingly.",
    "trackingNote": "Monitor the establishment of the expert coordination council, data tracking framework, and actual curriculum revisions in Kerala universities.",
    "manifestoQuote": "Establish a global 'Job Watch Tower' to bridge the gap between Kerala's graduates and international employment trends by modernizing academic curricula.",
    "sector": {
      "id": "s5",
      "name": "Youth & Employment",
      "nameMl": "യുവജനങ്ങളും തൊഴിലും",
      "icon": "users",
      "color": "#9333EA"
    },
    "status": "pending",
    "icon": "users",
    "sources": [
      {
        "title": "Initial Manifesto Commitment",
        "url": "#",
        "publication": "UDF Manifesto / Media Report",
        "date": "2026-05-18",
        "tier": 2,
        "summary": "UDF 2026 manifesto placement initiative."
      }
    ],
    "lastUpdated": nowStr,
    "createdAt": nowStr
  },
  {
    "id": "p70",
    "slug": "daily-minimum-wage-of-700-for-asha-workers-70",
    "title": "₹700 daily minimum wage for ASHA workers",
    "titleMl": "ആശ വർക്കർമാർക്ക് ₹700 പ്രതിദിന കുറഞ്ഞ വേതനം",
    "description": "Structurally reform remuneration for ASHA workers by fixing a minimum daily wage of ₹700 to ensure fair labor practices and stable income.",
    "trackingNote": "Track official pay revisions, daily conversion calculations, and actual bank transfer receipts.",
    "manifestoQuote": "Fix the minimum wage of our dedicated ASHA workers at ₹700 per day to ensure stable livelihoods and respect for grassroots health warriors.",
    "sector": {
      "id": "s16",
      "name": "Labour",
      "nameMl": "തൊഴിൽ",
      "icon": "briefcase",
      "color": "#9333EA"
    },
    "status": "pending",
    "icon": "briefcase",
    "sources": [
      {
        "title": "Initial Manifesto Commitment",
        "url": "#",
        "publication": "UDF Manifesto / Media Report",
        "date": "2026-05-18",
        "tier": 2,
        "summary": "UDF 2026 manifesto labor reform."
      }
    ],
    "lastUpdated": nowStr,
    "createdAt": nowStr
  }
];

// Append new promises if they don't already exist
newPromises.forEach(newP => {
  if (!promises.some(p => p.id === newP.id)) {
    promises.push(newP);
    console.log(`Added missing promise: ${newP.id}`);
  } else {
    console.log(`Promise ${newP.id} already exists, skipping addition.`);
  }
});

// Write updated JSON back
fs.writeFileSync(dataPath, JSON.stringify(promises, null, 2), 'utf8');
console.log('Successfully completed audit modifications and translation updates in promises.json.');
