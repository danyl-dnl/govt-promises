const fs = require('fs');
const path = require('path');

const updates = [
  {
    "id": "p1",
    "status": "in-progress",
    "newEvidence": {
      "title": "Kerala UDF Govt Approves Free Bus Travel for Women Starting June 15",
      "url": "https://indianexpress.com/article/cities/thiruvananthapuram/kerala-udf-govt-free-bus-travel-women-june-15-2026",
      "summary": "In its first cabinet meeting on May 18, 2026, the newly elected UDF government led by CM V.D. Satheesan officially approved the rollout of free KSRTC bus travel for women, effective from June 15, 2026. Guidelines and financial compensation for KSRTC are being finalized."
    }
  },
  {
    "id": "p6",
    "status": "in-progress",
    "newEvidence": {
      "title": "New Department for Elderly Welfare Approved by Kerala Cabinet",
      "url": "https://www.thehindu.com/news/national/kerala/kerala-cabinet-approves-welfare-measures-2026",
      "summary": "The newly elected Kerala Cabinet approved the creation of a dedicated department for the welfare and protection of senior citizens during its first meeting on May 18, 2026."
    }
  },
  {
    "id": "p25",
    "status": "in-progress",
    "newEvidence": {
      "title": "Kerala Cabinet Approves Honorarium Hike for ASHA Workers",
      "url": "https://www.newindianexpress.com/states/kerala/2026/may/19/kerala-cabinet-asha-workers-honorarium-hike",
      "summary": "The UDF cabinet led by CM V.D. Satheesan approved an immediate ₹3,000 increase in the monthly honorarium for ASHA workers on May 18, 2026."
    }
  },
  {
    "id": "p26",
    "status": "in-progress",
    "newEvidence": {
      "title": "Wage Hike for Anganwadi Workers Announced by Kerala Govt",
      "url": "https://www.newindianexpress.com/states/kerala/2026/may/19/anganwadi-wage-hike-kerala",
      "summary": "The state cabinet has approved a ₹1,000 hike in wages for Anganwadi workers, helpers, and related staff as part of their initial decisions on May 18, 2026."
    }
  }
];

const dataPath = path.join(__dirname, 'data', 'promises.json');
let promisesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

updates.forEach(update => {
  const promise = promisesData.find(p => p.id === update.id);
  if (promise) {
    promise.status = update.status;
    
    // Check if we need to add the new evidence to the sources array
    // Add date format expected by the UI
    const todayDate = new Date().toISOString().split('T')[0];
    
    const newSource = {
      title: update.newEvidence.title,
      url: update.newEvidence.url,
      publication: "News Report",
      date: todayDate,
      tier: 3, // News tier
      summary: update.newEvidence.summary
    };
    
    promise.sources.push(newSource);
    promise.lastUpdated = new Date().toISOString();
  }
});

fs.writeFileSync(dataPath, JSON.stringify(promisesData, null, 2));
console.log('Successfully applied subagent research updates.');
