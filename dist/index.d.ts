import { PDFOptions } from "puppeteer";
export declare function generatePdf(htmlTemplatePath: string, data?: {}, pdfFormatDetails?: PDFOptions): Promise<Buffer>;
