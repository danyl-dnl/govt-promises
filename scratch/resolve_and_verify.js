const http = require('https');
const urlModule = require('url');

const redirects = {
  p1_ie: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAt3NZ7ye5fUtLDho4jG36hBGlR1d4wGNxW_W6Ve87IOcqILvosM19kxKEiaOeNLgCMx-KiOX__Bpn-qvUFyQmL7n3kXSXC04Trb6zXtzWOzmCXTXqo8lhwqNQdtZ-t8ZumR2OFVm7AkwLRk0gMIMb5HVqlg4Kh7k_ahuLixQr1TsXdO3KZ-laDf1RJMLskOxLAwdWtRv4v8Yr4ZTX6YsNzM90VVCjH2xDHNI5CfVBR0vbj72dBF0qsJwwXKy4M_k6kU4=',
  p1_onmanorama: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG5Tv6NgF1l5UrLpbEbqn7dsHdlfNnUdOKc-Y0u9rYKphBy_0m-NHs1IO85oiYPiao49BcHndQt6uuyNbICCbXsyBGoCZYe0ktJ-bILDD7FNAnTTuIofBuamnQ2QTe_Izbef1Yfsfp6ch_ratgvTJlWzan4epxiTBCAWktQvwbrEee28R14l1gBAFUHgDLTyP8X1_NRZRhI6ILh6BEryBHr0WxwTWMnRYfgjM0dxhY7edOEpo5Jfu20fF8JIkc=',
  p1_thehindu: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFVDjAATRoLa3ra_bQi2Vt8XaZjO99WD7Dj_a885V2ZUQ_djPZVytsGJbtdampmO5TvNqqeKUIojI6IfuFE7fbXpiHRhUvRkwOtA3iwbgGSwpXyb1pvYMKfSYRwfPWyEQCU9wbRe9IeAjy8OlFcgebMpHLjfI0Rwr1o6PE598qNMwrbbZO7e3UbkIUmZR9w8XdoPjaXAgmxuXkr6QtH2oVida0kwFY74w3aHZG9DE1Hz6iy1E6BnnBVvABhPmk=',
  
  p4_thehindu: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFrUxh8l22L1HLvOLohLkH2Sh1RKu20L6tnbDtEEC9aQY64_LJTQRfzAGfLFgbrNq8_E04r-uERttH8P0xGzZsgRMf5uvdR1yvSKkJGt7KQcukZMAKyktMat4Cr1E-tvjBo3WEgubA7FLX0LoBitq7XxBjjSr1WLaW-ArSoWp_RzLa0a36JG9rBiIM6c_dX8215pVTl_Ircp5HF2ZNJXDtXEhY6dG65CDgABFPm',
  p4_onmanorama: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFrvcQXa_LwhZTHgKC2lBUSYdaIs4jrpfxCqk92aais8jInTufmtw3vXdp5mGvmaaPJR27_O9xhmY6oCaN5cYVOjWUuuzIQLIaFro8LSZ56ED7uIk0i_UnZqUGQ51ScG1PS7g6vw7zdqTMgp2dIOzachkaM0VWKB-nr_LfA3wnWuCbZBd7VnP1kiedW61fU6ZqEiQ7ZV2IiSa2B',
  
  p6_thehindu: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUf_Bf0wvqhGvBjlFUqRH9tEfuuwGQygyE8zAk-6U-PGrCoWQSlVSekGtPyUQaX2p4WOYWbiTdTHLFHLCh0wMoTf-wQH3YUkOZd5bjZyLfrffCIcfnfXlATX_X2vnil-io8IkmbiwhANqfZSi8qB101dRBiyiCAzW5Zo7JInNGNshBKdb04dbgZnYL3E1DleQx03dvwL6oHrJsQokBylAfgmmGoIC6S8xBqRvLUOr_rTgSLSgk8KxMc6MKB0zkLLBHmxkgcry_eTJx1A5B0561PFu-dVpXgE7Xapk=',
  p6_onmanorama: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFwLAYBKkKdz9qm1SvlU1-X7yyHLjqkOjKnc0x_m9EbR7AV5AIUrPGFAhmJO8GAK0tRNd2RsW0_EbkyrfvMomWuuZHVkcBJgLPsFbS1t_VuwVNYDvTL2DvaA72665zz_umunS3DCLCwA9hJKncZuhAU9ad-7XhxY8Wg1dMx2BVOOmqys0k_pjnYRMrAM1gMwZuC7UZ6aOfScg==',
  
  p7_onmanorama: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFNZ9jtotXZ2NLajbdMKCRmPQd-DvgYzAvsajk1fQGA1oBY-UhBjU1A51li7YsbBDBgZ8uVkjZhDuQ5KYODgntlYt8NLtztHtm2eW0iTUNLH5EIbsPTUEHCpXXLlDUEVBiubT4xhZgB3mU37m2iTlEJ3SNy1TH4Us6_bw8hjyAAiS_Isz4e1yQ5vkNf4K74zy1j9C6CRZ8tUxV6HikRRooDII69nUNJZzCMhLLa4g==',
  p7_thehindu: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE4ZJrMJBp1BcnEdHQQu4us99ur2vmzOTarbm6K4LNPZnbQ927Sxwvu8JOYz8q3p8HTPtAd5Cribo9Mn0TXSpUWB8f5k90xHZIW_gNAn2V1yjvWILeJbrBHym_Z5HAX618lmrwvx5s2JFPePGfKb7AQ34v0nVj2sdRFfc-AsWijqCp_xze0AT73u6y-46yRGvAXtnSp-NzpQPZkgXFBB2jlOsiH3kB3VnK4y-4jja1Us4Y-umvkzRvmUw478IqOlHMKT-LZ2ZXvg4IGw_xqi0Rmnn06Ci5N8eHc3KE6QjwGuakIctqATSw=',
  
  p25_onmanorama: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH9ol8xNn6PeES9dfmFz_5xAzV6MHJ7FLE_1jrcOKVoNbBtsIcuB2M0tMc3UR5FTflZfYl3IKtr5jmqMUWWAzHcNp8_E5I00yEIHJHYSoD5N2NZDA9ewzFX2bX6uqn7vvS7fJyhX1c20-WjoH3cnRO6eMKDWSwehDkEn8tuo4gNvRgiZ4rbA8zNucLi611DcSUPp-jM1gwVxbhR-jB9ImBOyopPSX02gszhs4aaSm6MURoYfJsI',
  
  p26_nie: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkCS0qmeYELwKGe41iXdINLcdMFntH8AEQjj7rlvr4RUJvJY9Yh6qq-nEBMyWMSmnnUANFihPHrahapkmdsXl6K6o7h-BQqsNUX7pGq_B1QmoRzuXXvIswJrFAZHAKVZUfqDeeZRX5F1yrqQZzz10YWH2d-BuRi1bKuHlsXOp_ZXCcYFIOZEolnSrkgOxEpkCTQuq6mKfzNEIZCI5vyoiy',
  
  p27_thehindu: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEXUoW-AAqOR1jl2LHadc7piQNUJR5p5gX4G6xS81IrZPeKJeSa5NY26w_VwM0w_zGy7qhSCxXPbLoZyFvqz7RJTP5XXUsWJ_WkMSyTc3ZzDYC_tNvrrf55zmdzirqWmJLEIsZwhCgrgHJXxZx_svo2AHtoEWhULa6A9FMeBD97QYX-w-V0FV9KguYy6JQOKUjABYE3CDXg9iGQtSfopPc3rOxoDN6jPsVN-UAU5mYVrKG2959YWORE7Gaqm_JtZIX5KNNgWPTqXAQPHkaknGaFruQ=',
  p27_toi: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHxKVnEHqfBHBSvX3vubuHc2xrUp9ptzXEDSsijo1skRJ_Nfujcom707vId10KiLFq1k5_08B4QH--lRa5j6Thi4nm9mvZlom677OC9olVmlbGp3zPiaeTn7YV947F74UQzQDqhr2JowB4UJzjCg3Vh5ITJ14OPjYgDBe4GV5ltcys1fs_8K3kUJZmXW7RKH7jZJAJ6PzB-EnCGPPZq5Jf0q5FnbYV1UIXy_9ExNxMGh3zNDe0cagbmvb9YKMbuQjwPIQEFDrPOsPRh4kp49NyHJtB55yaG',
  
  p42_nie: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHRIbtvrEWpcqBiKounUq8YzjE3IGNVRP2lSFzsyKKIHKSdJLoTvIpfu8X1hfEAtISP3r36rU-WrvryVQfQ1cjiNjNb86nchtFcymo6D1JUtA6TAbye4iW6Mc2_5igVAgkcH0LdJZxaJRPxs_X4BzkQ7ss-SXVhcKWE6q488GtjWxDD87vRffQViNe2PcyfreSzK-JlJPCl5Nvj7lVDH9FLC79i66HnNUkxD-fLo8vlPCbq2HziVAEwfJ_iUEk-9P4B57YsVhpw2l2ra3J9d-rADIqF8XCghIqxXw==',
  
  p48_thehindu: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHwMw-SEPgRHg6CN8s2J2M7VcOdO5_29PTklqoSWwnjMgm9bUbIhCO1eZHeAiVqyFkAJpNwqnTAgNc_BYFYZLzuxFQFG0F3Yv4cwd7rUzp6ytkV1QulRHMcdrJDLzSMcquyN6-7bikN5OJlD0ex7Szx8gvmnx_RrKfoQkWlzpZ5wgbxSL9PB4WdeNYkpsJRR6jGGL3-VxwhP1pBiwy80gZGrY7G2DM5edghAtjNg0rGavHaCQ==',
  
  p49_ie: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFcApHNkcEeaX19AYDCRowAUQE-iaf8CJnfGrkn9BohX6bfitYm3dZ0xgFP06whUyYpyKuq1f5WpVzwhppLDgoRT03kG_Mq61NdqAYwlJNQ3cyqUktY2VuRArrmVIeifdlafSPZ-7HwP2D1W660IzbtI9vVme67JIfkPppXA0GOaHgtCxEEv2kTnLTrr0Hl122ehWXTz2SMTJvo5fWDEVZTW7wUmbMbqSPzoQKjjVJGYlZe_QA=',
  
  p59_thehindu: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEm_mg0MRREx53G8uhsC3BYEJkeZ20bJLzrVhLIUZPJApm_Y6WzasU7yh-GQfenzAhsBtBRORVrGXu9zdlpvbjvWIJ_w6jMDwaaQmHJM9LnK3UzzY1RBHG90IWunN5YLM8XxruUVOpuyzQ2x811v43NQzoQathkaEgx6on_TGMCtmTJ64ecXJGt-lyUX81E5gVBM4edGbdIttxrfZXHs0BolltocJuzXtYlUuwr6kJe5sm_8KLtSEHsmO34e_ShPF74fJMHBhBO3us='
};

function resolveRedirect(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        resolve(res.headers.location);
      } else {
        reject(new Error(`Failed to resolve. Status code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

function verifyUrl(url) {
  return new Promise((resolve) => {
    const parsed = urlModule.parse(url);
    const options = {
      method: 'GET',
      hostname: parsed.hostname,
      path: parsed.path,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    };
    http.get(options, (res) => {
      resolve({ status: res.statusCode, url: url });
    }).on('error', (e) => {
      resolve({ status: 'ERROR: ' + e.message, url: url });
    });
  });
}

async function run() {
  const resolved = {};
  for (const [key, value] of Object.entries(redirects)) {
    console.log(`Resolving ${key}...`);
    try {
      const realUrl = await resolveRedirect(value);
      console.log(`  -> Resolved to: ${realUrl}`);
      const verification = await verifyUrl(realUrl);
      console.log(`  -> Verification Status: ${verification.status}`);
      resolved[key] = {
        redirectUrl: value,
        realUrl: realUrl,
        status: verification.status
      };
    } catch (e) {
      console.error(`  -> Failed to resolve: ${e.message}`);
      resolved[key] = {
        redirectUrl: value,
        error: e.message
      };
    }
  }
  console.log('\n--- SUMMARY ---');
  console.log(JSON.stringify(resolved, null, 2));
}

run();
