const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/promises.json');
const promises = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Updates map
const updates = {
  p1: {
    targetUrl: 'https://indianexpress.com/article/cities/thiruvananthapuram/kerala-udf-govt-free-bus-travel-women-june-15-2026',
    realUrl: 'https://www.newindianexpress.com/states/kerala/2026/May/18/newly-formed-kerala-cabinet-clears-free-ksrtc-travel-for-women-asha-pay-hike',
    title: 'Newly-formed Kerala Cabinet clears free KSRTC travel for women, ASHA pay hike',
    publication: 'The New Indian Express',
    date: '2026-05-18',
    summary: 'In its first cabinet meeting on May 18, 2026, the newly elected UDF government approved the rollout of free KSRTC bus travel for women alongside wage hikes for scheme workers.'
  },
  p4: {
    targetUrl: 'https://www.thehindu.com/news/national/kerala/kerala-welfare-pension-may-disbursement-2026',
    realUrl: 'https://www.thehindu.com/news/national/kerala/social-security-pension-disbursement-from-may-25/article70998663.ece',
    title: 'Social security pension disbursement from May 25',
    publication: 'The Hindu',
    date: '2026-05-19',
    summary: 'The state government allocated ₹1,070 crore for the distribution of social security and welfare pensions to 62 lakh beneficiaries starting May 25, 2026. The monthly payout remains at the existing rate of ₹2,000, as the promised hike to ₹3,000 has not yet been implemented.'
  },
  p6: {
    targetUrl: 'https://www.thehindu.com/news/national/kerala/kerala-cabinet-approves-welfare-measures-2026',
    realUrl: 'https://www.thehindu.com/news/national/kerala/kerala-govts-decision-to-set-up-dedicated-senior-citizens-welfare-department-hailed-as-timely/article71003285.ece',
    title: "Kerala govt's decision to set up dedicated Senior Citizens Welfare Department hailed as timely",
    publication: 'The Hindu',
    date: '2026-05-20',
    summary: 'The newly elected Kerala Cabinet approved the creation of a dedicated department for the welfare and protection of senior citizens during its first meeting on May 18, 2026. Stakeholders and senior citizen advocacy groups welcomed the move as timely.'
  },
  p7: {
    targetUrl: 'https://www.onmanorama.com/news/kerala/2026/05/25/kerala-udf-govt-vision-2031-roadmap-pensions.html',
    realUrl: 'https://www.onmanorama.com/news/kerala/2026/05/23/udf-government-unveils-vision-2031-policy-roadmap-for-kerala.html',
    title: "UDF government unveils 'Vision 2031' policy roadmap for Kerala",
    publication: 'Onmanorama',
    date: '2026-05-23',
    summary: "The newly elected UDF government in Kerala unveiled its comprehensive 'Vision 2031' policy roadmap on May 23, 2026, which proposes to declare welfare pensions as a statutory right for citizens and establish a regulatory commission to manage and safeguard pension distribution."
  },
  p25: {
    targetUrl: 'https://www.newindianexpress.com/states/kerala/2026/may/19/kerala-cabinet-asha-workers-honorarium-hike',
    realUrl: 'https://www.onmanorama.com/news/kerala/2026/05/21/asha-workers-celebrate-wage-hike-with-payasam-in-thiruvananthapuram.html',
    title: 'ASHA workers celebrate wage hike with payasam in Thiruvananthapuram',
    publication: 'Onmanorama',
    date: '2026-05-21',
    summary: "ASHA workers celebrated the newly elected UDF cabinet's decision to increase their monthly honorarium by ₹3,000, bringing it up to ₹12,000, by distributing sweets and payasam in front of the Secretariat."
  },
  p26: {
    targetUrl: 'https://www.newindianexpress.com/states/kerala/2026/may/19/anganwadi-wage-hike-kerala',
    realUrl: 'https://www.newindianexpress.com/states/kerala/2026/May/19/team-satheesan-kicks-off-on-a-welfare-note',
    title: 'Team Satheesan kicks off on a welfare note',
    publication: 'The New Indian Express',
    date: '2026-05-19',
    summary: 'The newly sworn-in UDF government under CM V.D. Satheesan approved an immediate ₹1,000 hike in wages for Anganwadi workers, helpers, and related staff in its first Cabinet meeting on May 18, 2026.'
  },
  p27: {
    targetUrl: 'https://timesofindia.indiatimes.com/city/thiruvananthapuram/kerala-govt-pre-primary-honorarium-hike-2026',
    realUrl: 'https://timesofindia.indiatimes.com/city/kochi/kerala-hc-sets-aside-order-enhancing-honorarium-of-pre-primary-teachers-ayahs/amp_articleshow/131333331.cms',
    title: 'Kerala HC sets aside order enhancing honorarium of pre-primary teachers, ayahs',
    publication: 'Times of India',
    date: '2026-05-26',
    summary: 'A division bench of the Kerala High Court set aside a single bench order directing the state to enhance pre-primary staff honorariums. The division bench directed the state to fix an ad-hoc honorarium within two months and formulate proper service conditions within four months.'
  },
  p42: {
    targetUrl: 'https://www.newindianexpress.com/states/kerala/2026/may/25/kerala-government-not-scrapping-life-mission',
    realUrl: 'https://www.newindianexpress.com/states/kerala/2026/May/25/life-mission-row-minister-denies-scrapping-scheme-says-focus-is-on-strengthening-grama-sabha-powers',
    title: 'LIFE Mission row: Minister denies scrapping scheme, says focus is on strengthening Grama Sabha powers',
    publication: 'The New Indian Express',
    date: '2026-05-25',
    summary: 'LSGD Minister K. M. Shaji clarified that the newly elected UDF government has no plans to scrap the LIFE Mission housing project. Instead, the government will reform the scheme by restoring and strengthening the powers of grama panchayats and grama sabhas to select beneficiaries, aligning with the principles of Gandhian Gram Swaraj.'
  },
  p48_src1: {
    targetUrl: 'https://www.onmanorama.com/news/kerala/2026/05/20/kerala-cabinet-decides-to-scrap-controversial-silverline-rail-project.html',
    realUrl: 'https://www.thehindu.com/news/national/kerala/keralas-udf-govt-scraps-k-rail-project-launched-by-ldf/article71001199.ece',
    title: 'Kerala’s UDF government scraps K-Rail project launched by LDF',
    publication: 'The Hindu',
    date: '2026-05-20',
    summary: 'The new Kerala Cabinet decided to scrap the controversial SilverLine (K-Rail) project due to environmental and financial unviability, ordering the removal of boundary survey stones and denotification of lands.'
  },
  p48_src2: {
    targetUrl: 'https://www.onmanorama.com/news/kerala/2026/05/25/kerala-revenue-department-cancels-silverline-land-acquisition-notifications.html',
    realUrl: 'https://indianexpress.com/article/india/udf-govt-cancels-kerala-silverline-project-remove-survey-markers-protest-10699431/',
    title: 'UDF government cancels Kerala SilverLine project, to remove survey markers, withdraw protest cases',
    publication: 'The Indian Express',
    date: '2026-05-25',
    summary: 'The Kerala Revenue Department issued formal orders cancelling the land acquisition notifications previously published for the SilverLine rail project across various districts, fulfilling the land denotification promise.'
  },
  p49: {
    targetUrl: 'https://www.onmanorama.com/news/kerala/2026/05/20/kerala-cabinet-decides-to-scrap-controversial-silverline-rail-project.html',
    realUrl: 'https://www.thehindu.com/news/national/kerala/keralas-udf-govt-scraps-k-rail-project-launched-by-ldf/article71001199.ece',
    title: 'Kerala’s UDF government scraps K-Rail project launched by LDF',
    publication: 'The Hindu',
    date: '2026-05-20',
    summary: "On May 20, 2026, the Kerala Cabinet officially scrapped the SilverLine (K-Rail) project due to lack of central government clearance, financial unviability, and strong public protests, successfully fulfilling the UDF's core pledge."
  },
  p59: {
    targetUrl: 'https://www.thehindu.com/news/national/kerala/kerala-cabinet-economic-white-paper-2026',
    realUrl: 'https://www.thehindu.com/news/national/kerala/keralas-udf-govt-forms-expert-panel-to-prepare-white-paper-on-state-finances/article70997441.ece',
    title: "Kerala's UDF govt forms expert panel to prepare White Paper on State finances",
    publication: 'The Hindu',
    date: '2026-05-19',
    summary: "On May 19, 2026, the newly sworn-in UDF government in Kerala constituted an expert committee chaired by former Cabinet Secretary K.M. Chandrasekhar to prepare a comprehensive White Paper on the state’s financial situation, off-budget borrowings, and liabilities."
  }
};

let modifiedCount = 0;

promises.forEach((p) => {
  if (!p.sources) return;
  p.sources.forEach((s) => {
    // Unique matching logic
    let update = null;
    if (p.id === 'p48') {
      if (s.url === updates.p48_src1.targetUrl) {
        update = updates.p48_src1;
      } else if (s.url === updates.p48_src2.targetUrl) {
        update = updates.p48_src2;
      }
    } else {
      update = updates[p.id];
    }

    if (update && s.url === update.targetUrl) {
      console.log(`Updating promise ${p.id} source: "${s.title}"`);
      s.url = update.realUrl;
      s.title = update.title;
      s.publication = update.publication;
      s.date = update.date;
      s.summary = update.summary;
      modifiedCount++;
    }
  });
});

if (modifiedCount > 0) {
  fs.writeFileSync(jsonPath, JSON.stringify(promises, null, 2), 'utf8');
  console.log(`Successfully updated ${modifiedCount} mock sources in data/promises.json!`);
} else {
  console.log('No mock sources matched.');
}
