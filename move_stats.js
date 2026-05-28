const fs = require('fs');

const path = 'c:/Users/thang/OneDrive/Desktop/arun-ortho-main/index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Extract hero-stats
const statsRegex = /<!-- Stats row -->[\s\S]*?<div class="hero-stats">[\s\S]*?<\/div>\s*<\/div>/;
const match = html.match(statsRegex);
if (!match) {
  console.log("Could not find hero-stats");
  process.exit(1);
}

const statsHtml = match[0];

// 2. Remove from hero
html = html.replace(statsRegex, '');

// 3. Insert below hero
const heroEndRegex = /(<\/section>\s*<!-- ================================================================\r?\n\s*TRUST FEATURES STRIP)/;

const newStatsSection = `
<!-- ================================================================
     HERO STATS STRIP
================================================================ -->
<section class="stats-strip" aria-label="Clinic Statistics">
  <div class="container">
    ` + statsHtml.replace('<!-- Stats row -->\n      ', '') + `
  </div>
</section>
`;

html = html.replace(heroEndRegex, newStatsSection + '\n$1');

fs.writeFileSync(path, html, 'utf8');
console.log("Moved hero-stats below hero section.");
