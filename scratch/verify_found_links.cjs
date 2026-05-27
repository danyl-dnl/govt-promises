const fs = require('fs');
const path = require('path');
const http = require('https');
const urlModule = require('url');

const jsonPath = path.join(__dirname, '../data/promises.json');
const promises = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const urlsToVerify = [];

promises.forEach((p) => {
  if (p.sources && Array.isArray(p.sources)) {
    p.sources.forEach((s) => {
      // Exclude initial manifesto commitments which use "#"
      if (s.url && s.url.startsWith('http')) {
        urlsToVerify.push({
          promiseId: p.id,
          title: p.title,
          sourceTitle: s.title,
          url: s.url
        });
      }
    });
  }
});

async function verifyUrl(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    return { status: response.status, ok: [200, 301, 302].includes(response.status) };
  } catch (e) {
    return { status: 'ERROR: ' + e.message, ok: false };
  }
}

async function run() {
  console.log(`Starting verification of ${urlsToVerify.length} replaced URLs...`);
  console.log('===========================================================');
  let successCount = 0;
  
  for (const item of urlsToVerify) {
    console.log(`Verifying Promise ${item.promiseId} ("${item.title}")`);
    console.log(`  Source: ${item.sourceTitle}`);
    console.log(`  URL:    ${item.url}`);
    
    const result = await verifyUrl(item.url);
    console.log(`  Result: Status Code = ${result.status} [${result.ok ? 'SUCCESS' : 'FAILED'}]`);
    console.log('-----------------------------------------------------------');
    
    if (result.ok) {
      successCount++;
    }
  }
  
  console.log('\n================ VERIFICATION SUMMARY ================');
  console.log(`Total URLs Checked: ${urlsToVerify.length}`);
  console.log(`Successful Resolves: ${successCount}`);
  console.log(`Failed Resolves:     ${urlsToVerify.length - successCount}`);
  console.log('======================================================');
  
  if (successCount === urlsToVerify.length) {
    console.log('All links verified successfully!');
    process.exit(0);
  } else {
    console.log('Some links failed to verify. Please inspect the log.');
    process.exit(1);
  }
}

run();
