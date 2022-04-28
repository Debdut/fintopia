import fs from "fs";
import * as cheerio from "cheerio";

const fileName = process.argv[2];

console.log("json:", fileName);

const jsonFileName = fileName.replace("html", "json");
const htmlContents = fs.readFileSync(fileName)
  .toString();
const $ = cheerio.load(htmlContents);
const json = $("script[type=application/json]").html();

fs.writeFileSync(jsonFileName, json);