const fs = require('fs');
const path = require('path');
const https = require('https');

const promisesPath = path.join(__dirname, '..', 'data', 'promises.json');
const expectedUrl = 'https://www.deccanherald.com/elections/kerala/kerala-assembly-elections-2026-udf-releases-manifesto-promises-free-bus-travel-for-women-3953366';

function verifyUrl(url) {
  return new Promise((resolve) => {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    };

    const req = https.request(url, options, (res) => {
      resolve(res.statusCode);
    });

    req.on('error', (err) => {
      resolve(null);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.end();
  });
}

async function run() {
  console.log('--- STARTING MANIFESTO LINK VERIFICATION ---');
  if (!fs.existsSync(promisesPath)) {
    console.error(`Error: File not found at ${promisesPath}`);
    process.exit(1);
  }

  const promises = JSON.parse(fs.readFileSync(promisesPath, 'utf8'));

  let manifestoSourcesCount = 0;
  let correctUrlCount = 0;
  let incorrectUrlCount = 0;
  let remainingPlaceholderCount = 0;

  promises.forEach((p) => {
    if (p.sources && Array.isArray(p.sources)) {
      p.sources.forEach((s) => {
        if (s.title === 'Initial Manifesto Commitment') {
          manifestoSourcesCount++;
          if (s.url === expectedUrl) {
            correctUrlCount++;
          } else if (s.url === '#') {
            remainingPlaceholderCount++;
          } else {
            incorrectUrlCount++;
            console.log(`WARNING: Promise ${p.id} has unexpected URL for manifesto commitment: ${s.url}`);
          }
        }
      });
    }
  });

  console.log(`Total 'Initial Manifesto Commitment' sources found: ${manifestoSourcesCount}`);
  console.log(`Sources with Deccan Herald URL: ${correctUrlCount}`);
  console.log(`Sources with remaining placeholder '#': ${remainingPlaceholderCount}`);
  console.log(`Sources with other unexpected URLs: ${incorrectUrlCount}`);

  if (correctUrlCount === 0) {
    console.error('ERROR: No updated manifesto URLs found!');
    process.exit(1);
  }

  console.log('\nPerforming live network resolution on the target URL...');
  const statusCode = await verifyUrl(expectedUrl);
  console.log(`Deccan Herald URL: ${expectedUrl}`);
  console.log(`Response HTTP Status Code: ${statusCode}`);

  if (statusCode === 200) {
    console.log('SUCCESS: URL resolved with 200 OK status code.');
    process.exit(0);
  } else {
    console.error(`FAILED: URL returned status ${statusCode || 'error'}`);
    process.exit(1);
  }
}

run();
