const fs = require('fs');
const https = require('https');
const http = require('http');

const data = JSON.parse(fs.readFileSync('data/promises.json', 'utf8'));
const urls = new Set();

data.forEach(p => {
  if (p.updates) {
    p.updates.forEach(u => {
      if (u.url) urls.add(u.url);
    });
  }
});

console.log(`Found ${urls.size} unique URLs.`);

async function checkUrl(urlStr) {
  return new Promise((resolve) => {
    const req = (urlStr.startsWith('https') ? https : http).get(urlStr, {
      timeout: 5000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      resolve({ url: urlStr, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url: urlStr, error: err.message });
    });
    req.end();
  });
}

async function run() {
  const urlList = Array.from(urls);
  let errors = 0;
  for (let i = 0; i < urlList.length; i++) {
    const res = await checkUrl(urlList[i]);
    if (res.error || res.status >= 400) {
      console.log(`Error or bad status for ${res.url}: ${res.error || res.status}`);
      errors++;
    }
  }
  console.log(`Verification complete. ${errors} errors found.`);
}

run();
