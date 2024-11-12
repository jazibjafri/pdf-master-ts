import fs from "fs";
import path from "path";
import utils from "util";
import puppeteer, { PDFOptions } from "puppeteer";
import hb from "handlebars";

const readFile = utils.promisify(fs.readFile);

// Loading HTML template
async function getTemplateHtml(htmlTemplatePath: string) {
  let templatePath;
  try {
    templatePath = path.resolve(htmlTemplatePath);
    return await readFile(templatePath, "utf8");
  } catch (err) {
    return Promise.reject("Could not load html template");
  }
}

// Generating PDF
export async function generatePdf(
  htmlTemplatePath: string,
  data = {},
  pdfFormatDetails: PDFOptions = {}
) {
  let PDF: Buffer | undefined;
  await getTemplateHtml(htmlTemplatePath).then(async (res) => {
    // Now we have the html code of our template in res object
    // you can check by logging it on console
    const template = hb.compile(res);
    const result = await template(data);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(result);
    PDF = await page.pdf(pdfFormatDetails);
    await browser.close();
  });
  return PDF!;
}
