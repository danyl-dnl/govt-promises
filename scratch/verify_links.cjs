const fs = require('fs');
const https = require('https');
const path = require('path');

const promisesPath = path.join(__dirname, '..', 'data', 'promises.json');

function getUniqueUrls() {
  const fileContent = fs.readFileSync(promisesPath, 'utf8');
  const promises = JSON.parse(fileContent);
  const urls = new Set();
  
  promises.forEach(promise => {
    if (promise.sources && Array.isArray(promise.sources)) {
      promise.sources.forEach(source => {
        if (source.url && source.url !== '#') {
          urls.add(source.url);
        }
      });
    }
  });
  
  return Array.from(urls);
}

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
      resolve({
        url,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        success: res.statusCode >= 200 && res.statusCode < 400
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        statusCode: null,
        statusMessage: err.message,
        success: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        statusCode: null,
        statusMessage: 'Timeout',
        success: false
      });
    });

    req.end();
  });
}

async function run() {
  console.log('Extracting unique URLs...');
  const urls = getUniqueUrls();
  console.log(`Found ${urls.length} unique external URLs.`);
  console.log(urls);

  console.log('\nVerifying URLs...');
  const results = [];
  for (const url of urls) {
    console.log(`Checking: ${url}`);
    const result = await verifyUrl(url);
    results.push(result);
    console.log(`Result: ${result.statusCode || 'ERROR'} (${result.statusMessage || ''})`);
  }

  console.log('\n--- VERIFICATION SUMMARY ---');
  results.forEach(res => {
    console.log(`${res.success ? '✔' : '✘'} ${res.url} -> Status: ${res.statusCode || 'N/A'}, Error/Msg: ${res.statusMessage || 'None'}`);
  });
}

run().catch(err => {
  console.error('Error running script:', err);
});
