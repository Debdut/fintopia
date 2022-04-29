mkdir data
curl https://fintopea.com/sitemap-0.xml -o data/fintopia.xml
# npm install -g sitemap-urls cheerio
npx sitemap-urls data/fintopia.xml > data/fintopia.links
node scripts/download.mjs
for f in data/*.html; do
  node scripts/extract.mjs $f
done
mkdir data/{cash-flow-statement,income-statement,balance-sheet,custom-metrics,quote}.{json,html} data/{links,sitemap,logs}
mv data/*.log data/logs
mv data/*sitemap*xml data/sitemap
mv data/*.links data/links
mv data/*.cash-flow-statement.json data/cash-flow-statement.json
mv data/*.cash-flow-statement.html data/cash-flow-statement.html
mv data/*.income-statement.json data/income-statement.json
mv data/*.income-statement.html data/income-statement.html
mv data/*.balance-sheet.json data/balance-sheet.json
mv data/*.balance-sheet.html data/balance-sheet.html
mv data/*.custom-metrics.json data/custom-metrics.json
mv data/*.custom-metrics.html data/custom-metrics.html
mv data/[A-Z]*.html data/quote.html
mv data/[A-Z]*.json data/quote.json
