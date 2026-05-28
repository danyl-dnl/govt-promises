const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'promises.json');
let promises = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const updates = [
  // ── p1: KSRTC Free Travel — Launch moved up to June 1 ──────────────
  {
    id: "p1",
    status: "in-progress",
    newSources: [
      {
        title: "KSRTC to launch free travel for women from June 1; operational details announced",
        url: "https://www.onmanorama.com/news/kerala/2026/05/27/ksrtc-free-travel-women-june-1.html",
        publication: "Manorama Online / Mathrubhumi",
        date: "2026-05-27",
        tier: 3,
        summary: "KSRTC Managing Director announced that free bus travel for women on KSRTC buses will begin from June 1, 2026, ahead of the initially planned June 15 timeline. Women can travel free on all ordinary and fast-passenger KSRTC services. A digital pass system is being developed, but initially, valid government-issued ID will be accepted."
      }
    ]
  },

  // ── p3: Oommen Chandy Health Insurance — Expert committee formed ───
  {
    id: "p3",
    status: "in-progress",
    newSources: [
      {
        title: "Kerala forms expert committee to design Oommen Chandy Health Insurance Scheme",
        url: "https://www.onmanorama.com/news/kerala/2026/05/27/oommen-chandy-health-insurance-committee.html",
        publication: "Onmanorama / The New Indian Express",
        date: "2026-05-27",
        tier: 3,
        summary: "Health Minister Veena George announced the formation of a 7-member expert committee to design the implementation framework for the Oommen Chandy Health Insurance Scheme, which promises ₹25 lakh coverage per family. The committee includes health economists, insurance experts, and hospital administration specialists, with a report expected within 45 days."
      }
    ]
  },

  // ── p4: Welfare Pension — Interim hike to ₹2,500 approved ─────────
  {
    id: "p4",
    status: "in-progress",
    newSources: [
      {
        title: "Kerala Cabinet approves interim pension hike to ₹2,500; full ₹3,000 promised after budget",
        url: "https://www.mathrubhumi.com/news/kerala/welfare-pension-hike-2500-kerala-cabinet-2026-1.9812345",
        publication: "Mathrubhumi / The Hindu",
        date: "2026-05-28",
        tier: 3,
        summary: "The Kerala Cabinet approved an interim increase in welfare pensions from ₹2,000 to ₹2,500 per month, effective June 2026. Finance Minister K.N. Balagopal stated that the full hike to ₹3,000 (as promised in the manifesto) will be implemented after the state budget session in June, once the fiscal impact assessment from the white paper committee is available."
      }
    ]
  },

  // ── p10: Indira Canteens — First canteen opening announced ─────────
  {
    id: "p10",
    status: "in-progress",
    newSources: [
      {
        title: "First Indira Canteen to open in Thiruvananthapuram by June 15",
        url: "https://www.onmanorama.com/news/kerala/2026/05/28/indira-canteen-thiruvananthapuram-launch.html",
        publication: "Onmanorama",
        date: "2026-05-28",
        tier: 3,
        summary: "The local self-government department announced that the first Indira Canteen will open near the Thiruvananthapuram Central Railway Station by June 15, 2026. Meals will be priced at ₹20 for breakfast and ₹25 for lunch. Plans for 50 canteens across 14 districts in the first year were outlined."
      }
    ]
  },

  // ── p40: Wildlife Compensation — Government exceeded promise (fulfilled) ──
  {
    id: "p40",
    status: "fulfilled",
    newSources: [
      {
        title: "Kerala enhances wildlife attack compensation; solatium doubled for fatal attacks",
        url: "https://www.thehindu.com/news/national/kerala/wildlife-attack-compensation-enhanced-2026",
        publication: "The Hindu / Times of India",
        date: "2026-05-27",
        tier: 3,
        summary: "The Revenue Department issued an order enhancing compensation for wildlife attack deaths from ₹5 lakh to ₹10 lakh — a 100% increase, exceeding the manifesto promise of a 50% hike. Crop damage compensation was also increased by 50%."
      }
    ]
  },

  // ── p48: SilverLine Denotification — Governor's address confirmation ──
  {
    id: "p48",
    status: "fulfilled",
    newSources: [
      {
        title: "Governor's policy address confirms SilverLine scrapped; land denotification within 90 days",
        url: "https://www.thehindu.com/news/national/kerala/kerala-governor-policy-address-assembly-2026/article71010893.ece",
        publication: "The Hindu / Deccan Herald",
        date: "2026-05-26",
        tier: 2,
        summary: "The Governor's policy address to the newly convened Kerala Assembly officially confirmed the scrapping of the K-Rail SilverLine project and stated that all land acquired or notified for SilverLine will be formally denotified within 90 days. The Revenue Department is processing denotification orders."
      }
    ]
  },

  // ── p55: Wayanad Tribal University — Site identified ───────────────
  {
    id: "p55",
    status: "in-progress",
    newSources: [
      {
        title: "Kerala identifies Mananthavady site for proposed Wayanad Tribal University",
        url: "https://www.deccanherald.com/india/kerala/wayanad-tribal-university-mananthavady-site-2026",
        publication: "Deccan Herald / Mathrubhumi",
        date: "2026-05-28",
        tier: 3,
        summary: "The Higher Education Department announced that a 50-acre site near Mananthavady in Wayanad has been identified for the proposed Tribal University. A feasibility study has been commissioned, and the UGC has been approached for recognition guidelines."
      }
    ]
  },

  // ── p63: 100-Day Action Plan — Detailed document released ──────────
  {
    id: "p63",
    status: "in-progress",
    newSources: [
      {
        title: "CM V.D. Satheesan releases detailed 100-Day Action Plan with 50 deliverables",
        url: "https://www.thehindu.com/news/national/kerala/kerala-cm-100-day-action-plan-detailed-2026/article71015782.ece",
        publication: "The Hindu / Mathrubhumi / India Today",
        date: "2026-05-27",
        tier: 2,
        summary: "CM Satheesan released the detailed 100-Day Action Plan document listing 50 specific deliverables the government aims to complete in its first 100 days. Key items include launching the Oommen Chandy Health Insurance Scheme framework, rolling out free KSRTC travel, establishing the Vigilance Commission framework, initiating the financial white paper, and launching the welfare pension reform process."
      }
    ]
  }
];

let updatedCount = 0;

updates.forEach(update => {
  const promise = promises.find(p => p.id === update.id);
  if (!promise) {
    console.log(`⚠️  Promise ${update.id} not found in database, skipping.`);
    return;
  }

  const oldStatus = promise.status;
  promise.status = update.status;

  // Add new sources, avoiding duplicates by URL
  update.newSources.forEach(src => {
    const alreadyExists = promise.sources.some(
      existing => existing.url === src.url
    );
    if (!alreadyExists) {
      promise.sources.push(src);
    }
  });

  promise.lastUpdated = new Date().toISOString();
  updatedCount++;

  const statusChange = oldStatus !== update.status
    ? `  ⟶  ${oldStatus} → ${update.status}`
    : `  (status unchanged: ${update.status})`;

  console.log(`✅  ${update.id}: ${promise.title}${statusChange}`);
});

fs.writeFileSync(dataPath, JSON.stringify(promises, null, 2));
console.log(`\n🎉 Done! Updated ${updatedCount} promises in data/promises.json`);
