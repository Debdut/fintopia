curl https://fintopea.com/sitemap-0.xml -o data/fintopia.xml
# npm install -g sitemap-urls cheerio
npx sitemap-urls data/fintopia.xml > data/fintopia.links
node scripts/download.mjs
for f in data/*.html; do
  node scripts/extract.mjs $f
done