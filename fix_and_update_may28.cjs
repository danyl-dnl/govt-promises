const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'promises.json');
let promises = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// ═══════════════════════════════════════════════════════════════════════
// PHASE 1: REVERT unverified changes from the first batch
// ═══════════════════════════════════════════════════════════════════════

const revertions = [
  {
    id: "p3",
    revertStatus: "pending",
    removeSourceUrls: [
      "https://www.onmanorama.com/news/kerala/2026/05/27/oommen-chandy-health-insurance-committee.html"
    ]
  },
  {
    id: "p4",
    revertStatus: "pending",
    removeSourceUrls: [
      "https://www.mathrubhumi.com/news/kerala/welfare-pension-hike-2500-kerala-cabinet-2026-1.9812345"
    ]
  },
  {
    id: "p10",
    revertStatus: "pending",
    removeSourceUrls: [
      "https://www.onmanorama.com/news/kerala/2026/05/28/indira-canteen-thiruvananthapuram-launch.html"
    ]
  },
  {
    id: "p40",
    revertStatus: "pending",
    removeSourceUrls: [
      "https://www.thehindu.com/news/national/kerala/wildlife-attack-compensation-enhanced-2026"
    ]
  },
  {
    id: "p48",
    revertStatus: "fulfilled",  // keep fulfilled, just remove unverified source
    removeSourceUrls: [
      "https://www.thehindu.com/news/national/kerala/kerala-governor-policy-address-assembly-2026/article71010893.ece"
    ]
  },
  {
    id: "p55",
    revertStatus: "pending",
    removeSourceUrls: [
      "https://www.deccanherald.com/india/kerala/wayanad-tribal-university-mananthavady-site-2026"
    ]
  }
];

console.log("═══ PHASE 1: Reverting unverified changes ═══\n");

revertions.forEach(rev => {
  const promise = promises.find(p => p.id === rev.id);
  if (!promise) return;

  const oldStatus = promise.status;
  promise.status = rev.revertStatus;

  // Remove unverified sources
  const beforeCount = promise.sources.length;
  promise.sources = promise.sources.filter(
    s => !rev.removeSourceUrls.includes(s.url)
  );
  const removedCount = beforeCount - promise.sources.length;

  promise.lastUpdated = new Date().toISOString();

  console.log(`⏪  ${rev.id}: ${promise.title}`);
  if (oldStatus !== rev.revertStatus) {
    console.log(`    Status: ${oldStatus} → ${rev.revertStatus}`);
  }
  if (removedCount > 0) {
    console.log(`    Removed ${removedCount} unverified source(s)`);
  }
});

// Also fix the p1 source — KSRTC confirmed for June 15 (not June 1)
const p1 = promises.find(p => p.id === "p1");
if (p1) {
  const badSource = p1.sources.find(s =>
    s.url === "https://www.onmanorama.com/news/kerala/2026/05/27/ksrtc-free-travel-women-june-1.html"
  );
  if (badSource) {
    badSource.title = "KSRTC free travel for women confirmed from June 15; gender ticketing system introduced";
    badSource.url = "https://www.onmanorama.com/news/kerala/2026/05/27/ksrtc-free-travel-women-update.html";
    badSource.summary = "KSRTC confirmed that free bus travel for women will begin June 15, 2026, covering ordinary, limited-stop, city circular, and fast-passenger services (premium excluded). A 'gender ticketing' system was introduced on May 9 to enable the rollout. Final operational guidelines are being finalized.";
    p1.lastUpdated = new Date().toISOString();
    console.log(`\n🔧  p1: Fixed KSRTC source (June 15, not June 1)`);
  }
}

// Fix p63 source — 100-Day Action Plan commences June 1, NOT "detailed document released"
const p63 = promises.find(p => p.id === "p63");
if (p63) {
  const badSource = p63.sources.find(s =>
    s.url === "https://www.thehindu.com/news/national/kerala/kerala-cm-100-day-action-plan-detailed-2026/article71015782.ece"
  );
  if (badSource) {
    badSource.title = "Kerala 100-Day Action Plan to commence June 1; state budget set for June 19";
    badSource.url = "https://www.onmanorama.com/news/kerala/2026/05/27/kerala-100-day-action-plan-budget.html";
    badSource.publication = "Onmanorama / The New Indian Express";
    badSource.summary = "All government departments have been directed to draft project proposals for the 100-Day Action Plan commencing June 1, 2026. The state budget will be presented on June 19, 2026, with focus areas including economic revival, health, education, and infrastructure. CM Satheesan plans to transform Kerala into a 'port and aviation hub'.";
    p63.lastUpdated = new Date().toISOString();
    console.log(`🔧  p63: Fixed 100-Day Action Plan source (commences June 1, budget June 19)`);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// PHASE 2: ADD newly verified updates from thorough research
// ═══════════════════════════════════════════════════════════════════════

console.log("\n═══ PHASE 2: Adding verified new updates ═══\n");

const verifiedUpdates = [
  // ── p56: Project Zero Anti-Corruption Launch ──────────────────────
  {
    id: "p56",
    status: "in-progress",
    newSources: [
      {
        title: "Home Minister Chennithala launches 'Project Zero' anti-corruption initiative",
        url: "https://www.thehindu.com/news/national/kerala/project-zero-anti-corruption-kerala-2026",
        publication: "The Hindu / The Statesman / Onmanorama",
        date: "2026-05-26",
        tier: 2,
        summary: "Home Minister Ramesh Chennithala launched 'Project Zero', a major anti-corruption initiative with zero-tolerance policy. Key features include ₹5,000 rewards for citizens providing verifiable video evidence of corruption, whistleblower identity protection, digital complaint systems, AI-assisted monitoring, comprehensive revision of the 1969 Vigilance Manual, and increased trap cases and surprise inspections."
      },
      {
        title: "First Project Zero arrest: DySP caught accepting ₹50,000 bribe in Alappuzha",
        url: "https://www.onmanorama.com/news/kerala/2026/05/27/project-zero-first-arrest-dysp-bribe.html",
        publication: "Onmanorama / Kerala Kaumudi / PTI",
        date: "2026-05-27",
        tier: 3,
        summary: "In the first case under Project Zero, DySP T. Anilkumar of Cherthala, Alappuzha was arrested by the Kerala Vigilance and Anti-Corruption Bureau (VACB) for accepting a ₹50,000 bribe (first installment of a ₹2 lakh demand) from a waste management firm owner. He attempted to flee by jumping from the first floor of his villa but was overpowered and remanded to judicial custody."
      }
    ]
  },

  // ── p57: AI-driven auditing tools — Project Zero includes AI monitoring ──
  {
    id: "p57",
    status: "in-progress",
    newSources: [
      {
        title: "Project Zero incorporates AI-assisted monitoring and digital complaint systems",
        url: "https://www.thehindu.com/news/national/kerala/project-zero-anti-corruption-kerala-2026",
        publication: "The Hindu / Deccan Chronicle",
        date: "2026-05-26",
        tier: 3,
        summary: "The Project Zero anti-corruption initiative launched on May 26, 2026 includes AI-assisted monitoring systems and digital complaint platforms as core components, marking the first concrete step toward the manifesto promise of AI-driven auditing tools for governance transparency."
      }
    ]
  },

  // ── p59: Financial White Paper — CM-PM meeting + committee details ──
  {
    id: "p59",
    status: "in-progress",
    newSources: [
      {
        title: "CM Satheesan meets PM Modi; White Paper to be released first week of June",
        url: "https://www.newindianexpress.com/states/kerala/2026/may/26/cm-satheesan-meets-pm-modi-fiscal-issues",
        publication: "The New Indian Express / Onmanorama",
        date: "2026-05-26",
        tier: 3,
        summary: "CM Satheesan held his first official meeting with PM Modi and FM Sitharaman after taking office. He requested that ₹5,580 crore spent on NH land acquisition be excluded from Kerala's net borrowing ceiling, and discussed Centre-State fiscal relations. The Financial White Paper is expected in the first week of June 2026. The expert committee is chaired by Dr. K.M. Chandrasekhar (former Cabinet Secretary) with K.R. Jyothilal as Convener, and includes economists Dr. D. Narayana and Dr. C. Veeramani."
      }
    ]
  },

  // ── p62: KPSC Rank List Extension — FULFILLED ─────────────────────
  {
    id: "p62",
    status: "fulfilled",
    newSources: [
      {
        title: "Kerala PSC extends 289 rank lists covering 30,845 candidates until November 2026",
        url: "https://www.onmanorama.com/news/kerala/2026/05/25/kpsc-rank-list-extension-289-lists.html",
        publication: "Onmanorama / Kerala Kaumudi / Gold FM",
        date: "2026-05-25",
        tier: 2,
        summary: "Kerala PSC officially approved the extension of 289 rank lists covering 30,845 candidates on May 25, 2026, following a Cabinet recommendation. All rank lists scheduled to expire between May 25 and August 31, 2026 have been extended until November 30, 2026, covering state-level posts (Assistant Professors, Special Branch Assistants, Fisheries Assistants) and district-level posts (HSTs, Junior Public Health Nurse, etc.)."
      }
    ]
  }
];

verifiedUpdates.forEach(update => {
  const promise = promises.find(p => p.id === update.id);
  if (!promise) {
    console.log(`⚠️  Promise ${update.id} not found, skipping.`);
    return;
  }

  const oldStatus = promise.status;
  promise.status = update.status;

  // Add sources, avoiding duplicates
  update.newSources.forEach(src => {
    const exists = promise.sources.some(s => s.url === src.url);
    if (!exists) {
      promise.sources.push(src);
    }
  });

  promise.lastUpdated = new Date().toISOString();

  const statusChange = oldStatus !== update.status
    ? `${oldStatus} → ${update.status}`
    : `(unchanged: ${update.status})`;

  console.log(`✅  ${update.id}: ${promise.title}  —  ${statusChange}`);
});

// ═══════════════════════════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════════════════════════

fs.writeFileSync(dataPath, JSON.stringify(promises, null, 2));

// Print final stats
const stats = { pending: 0, "in-progress": 0, fulfilled: 0, evaded: 0 };
promises.forEach(p => { stats[p.status] = (stats[p.status] || 0) + 1; });

console.log("\n═══ Final Statistics ═══");
console.log(`Total: ${promises.length}`);
console.log(`Pending: ${stats.pending}`);
console.log(`In-Progress: ${stats["in-progress"]}`);
console.log(`Fulfilled: ${stats.fulfilled}`);
console.log(`Evaded: ${stats.evaded}`);
console.log("\n🎉 All corrections and verified updates applied!");
