import fs from "fs";
import https from "https";

const FINTOPIA_BASE = "https://www.fintopea.com/quote/";

const links = fs.readFileSync("data/fintopia.links")
  .toString()
  .split("\n")
  .map(s => s.trim())
  .filter(s => s.length > 0)
  .filter(s => s.startsWith(FINTOPIA_BASE));

async function DownloadFile(link, fileFullPath) {
  console.info("downloading:", link);
  return new Promise((resolve, reject) => {
    https.get(link, (resp) => {

      // chunk received from the server
      resp.on("data", (chunk) => {
        fs.appendFileSync(fileFullPath, chunk);
      });

      // last chunk received, we are done
      resp.on("end", () => {
        resolve("File downloaded and stored at: " + fileFullPath);
      });

    }).on("error", (err) => {
      reject(new Error(err.message))
    });
  })
}

async function DownloadFintopiaLink(link) {
  const path = link.replace(FINTOPIA_BASE, "");
  const fileName = path.replace("/", ".") + ".html";
  return await DownloadFile(link, "data/" + fileName);
}

async function DownloadAllLinks() {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    await DownloadFintopiaLink(link);
    await sleep(1365);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

DownloadAllLinks();