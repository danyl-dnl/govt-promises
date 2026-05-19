const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'promises.json');
let promises = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const colorMap = {
  "s1": "#3B82F6",
  "s2": "#EC4899",
  "s3": "#10B981",
  "s4": "#F59E0B",
  "s5": "#6366F1",
  "s6": "#6B7280",
  "s7": "#F97316",
  "s8": "#EF4444",
  "s9": "#14B8A6",
  "s10": "#8B5CF6",
  "s11": "#A855F7",
  "s12": "#0EA5E9",
  "s13": "#D946EF",
  "s14": "#06B6D4",
  "s15": "#0891B2",
  "s16": "#7C3AED",
  "s17": "#22C55E",
  "s18": "#16A34A",
  "s19": "#15803D",
  "s20": "#86EFAC",
  "s21": "#4ADE80",
  "s22": "#0D9488",
  "s23": "#B45309",
  "s24": "#0F766E",
  "s25": "#1D4ED8",
  "s26": "#475569",
  "s27": "#2563EB",
  "s28": "#E11D48",
  "s29": "#0284C7",
  "s30": "#0369A1",
  "s31": "#BE185D",
  "s32": "#374151",
  "s33": "#4B5563",
  "s34": "#6D28D9"
};

promises.forEach(p => {
  if (p.sector && p.sector.id && colorMap[p.sector.id]) {
    p.sector.color = colorMap[p.sector.id];
  }
});

fs.writeFileSync(dataPath, JSON.stringify(promises, null, 2));
console.log("Successfully updated all sector colors dynamically!");
