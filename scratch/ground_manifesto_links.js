const fs = require('fs');
const path = require('path');
const https = require('https');

const promisesPath = path.join(__dirname, '..', 'data', 'promises.json');
const targetUrl = 'https://www.deccanherald.com/elections/kerala/kerala-assembly-elections-2026-udf-releases-manifesto-promises-free-bus-travel-for-women-3953366';

// Function to verify URL returns 200 OK
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
        success: res.statusCode === 200
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
  try {
    if (!fs.existsSync(promisesPath)) {
      console.error(`Error: File not found at ${promisesPath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(promisesPath, 'utf8');
    const promises = JSON.parse(fileContent);

    let updatedCount = 0;
    const updatedPromises = [];

    promises.forEach((promise) => {
      let promiseUpdated = false;
      if (promise.sources && Array.isArray(promise.sources)) {
        promise.sources.forEach((source) => {
          if (source.title === 'Initial Manifesto Commitment' && source.url === '#') {
            source.url = targetUrl;
            updatedCount++;
            promiseUpdated = true;
          }
        });
      }
      if (promiseUpdated) {
        updatedPromises.push({
          id: promise.id,
          title: promise.title
        });
      }
    });

    console.log(`[Database Update] Total replacements made: ${updatedCount}`);
    console.log(`[Database Update] Total promises containing updated sources: ${updatedPromises.length}`);

    if (updatedCount > 0) {
      // Write the updated JSON back with nice 2-space indentation
      fs.writeFileSync(promisesPath, JSON.stringify(promises, null, 2), 'utf8');
      console.log(`[Database Update] Successfully wrote changes to ${promisesPath}`);
    } else {
      console.log(`[Database Update] No records matched the replacement criteria.`);
    }

    // Now, verify the target URL
    console.log(`[Verification] Verifying Deccan Herald URL: ${targetUrl}`);
    const verificationResult = await verifyUrl(targetUrl);
    console.log(`[Verification] Status Code: ${verificationResult.statusCode}`);
    console.log(`[Verification] Success (Status 200): ${verificationResult.success}`);

    const resultSummary = {
      updatedCount,
      updatedPromisesCount: updatedPromises.length,
      updatedPromisesList: updatedPromises,
      urlVerification: verificationResult
    };

    // Output JSON result for easy reading by our agent process
    console.log('\n---RESULT_SUMMARY_START---');
    console.log(JSON.stringify(resultSummary, null, 2));
    console.log('---RESULT_SUMMARY_END---');

    if (!verificationResult.success) {
      console.error('[Verification Warning] URL did not return a successful 200 OK status!');
      process.exit(1);
    } else {
      console.log('[Verification Success] URL verified successfully with 200 OK.');
      process.exit(0);
    }

  } catch (error) {
    console.error('An error occurred during execution:', error);
    process.exit(1);
  }
}

run();
