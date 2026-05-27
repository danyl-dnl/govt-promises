const https = require('https');

const urls = [
  'https://www.onmanorama.com/news/kerala/2026/04/02/udf-manifesto-released-kerala-assembly-polls.html',
  'https://www.thehindu.com/news/national/kerala/kerala-assembly-polls-udf-releases-manifesto-promising-indira-guarantees/article67901234.ece'
];

function verifyUrl(url) {
  return new Promise((resolve) => {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 5000
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

    req.end();
  });
}

async function run() {
  for (const url of urls) {
    console.log(`Checking recommended URL: ${url}`);
    const res = await verifyUrl(url);
    console.log(`Result: ${res.statusCode} (${res.statusMessage})`);
  }
}

run();
