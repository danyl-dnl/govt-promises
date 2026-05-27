const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/promises.json');
const promises = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const allUrls = [];

promises.forEach((p) => {
  if (p.sources && Array.isArray(p.sources)) {
    p.sources.forEach((s) => {
      if (s.url && s.url.startsWith('http')) {
        allUrls.push({
          promiseId: p.id,
          title: p.title,
          sourceTitle: s.title || '',
          url: s.url
        });
      }
    });
  }
});

async function checkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    });
    clearTimeout(timeout);
    const ok = res.status < 400;
    return { status: res.status, ok, finalUrl: res.url };
  } catch (e) {
    clearTimeout(timeout);
    return { status: 'ERROR', ok: false, error: e.message };
  }
}

async function run() {
  const deduped = [...new Map(allUrls.map(u => [u.url, u])).values()];
  console.log(`Checking ${deduped.length} unique URLs across ${promises.length} promises...\n`);
  const failed = [];
  const passed = [];

  for (const item of deduped) {
    const result = await checkUrl(item.url);
    const icon = result.ok ? '✅' : '❌';
    console.log(`${icon} [${item.promiseId}] ${result.status} - ${item.url}`);
    if (!result.ok) {
      failed.push({ ...item, ...result });
    } else {
      passed.push({ ...item, ...result });
    }
  }

  console.log(`\n\n======== SUMMARY ========`);
  console.log(`Total unique URLs: ${deduped.length}`);
  console.log(`Passed: ${passed.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n\n======== FAILED URLS ========');
    failed.forEach(f => {
      console.log(`Promise: ${f.promiseId} (${f.title})`);
      console.log(`  Source: ${f.sourceTitle}`);
      console.log(`  URL: ${f.url}`);
      console.log(`  Status: ${f.status}${f.error ? ' - ' + f.error : ''}`);
      console.log('---');
    });
  } else {
    console.log('\nAll URLs are valid! 🎉');
  }
}

run();
