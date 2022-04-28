// https://stockanalysis.com/stocks/

Array.from(document.querySelectorAll("#symbol-table > tbody > tr > td:nth-child(1) > a")).map(t => t.textContent).join("\n")