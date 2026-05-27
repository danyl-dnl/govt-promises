const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/promises.json');
const promises = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Global replacements map (Mock URL -> Real URL)
const replacements = {
  // 1. Free KSRTC bus travel for women
  'https://indianexpress.com/article/cities/thiruvananthapuram/kerala-udf-govt-free-bus-travel-women-june-15-2026': 
    'https://www.newindianexpress.com/states/kerala/2026/May/18/newly-formed-kerala-cabinet-clears-free-ksrtc-travel-for-women-asha-pay-hike',

  // 2. Welfare pension disbursement May 2026
  'https://www.thehindu.com/news/national/kerala/kerala-welfare-pension-may-disbursement-2026':
    'https://www.thehindu.com/news/national/kerala/social-security-pension-disbursement-from-may-25/article70998663.ece',

  // 3. Cabinet approves welfare measures / senior citizens welfare department
  'https://www.thehindu.com/news/national/kerala/kerala-cabinet-approves-welfare-measures-2026':
    'https://www.thehindu.com/news/national/kerala/kerala-govts-decision-to-set-up-dedicated-senior-citizens-welfare-department-hailed-as-timely/article71003285.ece',

  // 4. Vision 2031 pensions roadmap
  'https://www.onmanorama.com/news/kerala/2026/05/25/kerala-udf-govt-vision-2031-roadmap-pensions.html':
    'https://www.onmanorama.com/news/kerala/2026/05/23/udf-government-unveils-vision-2031-policy-roadmap-for-kerala.html',
  'https://www.onmanorama.com/news/kerala/2026/05/23/udf-government-unveils-vision-2031-roadmap-for-kerala.html':
    'https://www.onmanorama.com/news/kerala/2026/05/23/udf-government-unveils-vision-2031-policy-roadmap-for-kerala.html',

  // 5. ASHA workers honorarium hike
  'https://www.newindianexpress.com/states/kerala/2026/may/19/kerala-cabinet-asha-workers-honorarium-hike':
    'https://www.onmanorama.com/news/kerala/2026/05/21/asha-workers-celebrate-wage-hike-with-payasam-in-thiruvananthapuram.html',

  // 6. Anganwadi wage hike
  'https://www.newindianexpress.com/states/kerala/2026/may/19/anganwadi-wage-hike-kerala':
    'https://www.newindianexpress.com/states/kerala/2026/May/19/team-satheesan-kicks-off-on-a-welfare-note',

  // 7. Pre-primary / midday meal cooks honorarium hike
  'https://timesofindia.indiatimes.com/city/thiruvananthapuram/kerala-govt-pre-primary-honorarium-hike-2026':
    'https://timesofindia.indiatimes.com/city/kochi/kerala-hc-sets-aside-order-enhancing-honorarium-of-pre-primary-teachers-ayahs/amp_articleshow/131333331.cms',

  // 8. LIFE Mission not scrapping
  'https://www.newindianexpress.com/states/kerala/2026/may/25/kerala-government-not-scrapping-life-mission':
    'https://www.newindianexpress.com/states/kerala/2026/May/25/life-mission-row-minister-denies-scrapping-scheme-says-focus-is-on-strengthening-grama-sabha-powers',

  // 9. Scrap SilverLine rail project
  'https://www.onmanorama.com/news/kerala/2026/05/20/kerala-cabinet-decides-to-scrap-controversial-silverline-rail-project.html':
    'https://www.onmanorama.com/news/kerala/2026/05/20/silverline-project-scrapped-land-acquisition-orders-denotified.html',

  // 10. Cancel SilverLine land acquisition notifications
  'https://www.onmanorama.com/news/kerala/2026/05/25/kerala-revenue-department-cancels-silverline-land-acquisition-notifications.html':
    'https://indianexpress.com/article/india/udf-govt-cancels-kerala-silverline-project-remove-survey-markers-protest-10699431/',

  // 11. Economic white paper
  'https://www.thehindu.com/news/national/kerala/kerala-cabinet-economic-white-paper-2026':
    'https://www.thehindu.com/news/national/kerala/keralas-udf-governments-100-day-action-plan-from-june-1/article71001656.ece'
};

console.log('Starting global replacements in data/promises.json...');
let replaceCount = 0;

promises.forEach(p => {
  if (p.sources && Array.isArray(p.sources)) {
    p.sources.forEach(s => {
      if (s.url && replacements[s.url]) {
        const oldUrl = s.url;
        const newUrl = replacements[oldUrl];
        s.url = newUrl;
        replaceCount++;
        
        console.log(`Replacing URL in promise ${p.id} ("${p.title}"):`);
        console.log(`  Old: ${oldUrl}`);
        console.log(`  New: ${newUrl}`);
        
        // Also perform specific title/metadata adjustments if necessary
        if (oldUrl === 'https://timesofindia.indiatimes.com/city/thiruvananthapuram/kerala-govt-pre-primary-honorarium-hike-2026') {
          s.title = 'Kerala HC sets aside order enhancing honorarium of pre-primary teachers, ayahs';
          s.publication = 'Times of India';
          s.date = '2026-05-26';
          s.summary = 'A division bench of the Kerala High Court set aside a single bench order directing the state to enhance pre-primary staff honorariums, directing the state to fix an ad-hoc honorarium and service conditions.';
        }
        
        console.log('-----------------------------------------');
      }
    });
  }
});

if (replaceCount > 0) {
  fs.writeFileSync(jsonPath, JSON.stringify(promises, null, 2), 'utf8');
  console.log(`Successfully completed ${replaceCount} global replacements in data/promises.json!`);
} else {
  console.log('No mock URLs found to replace.');
}
