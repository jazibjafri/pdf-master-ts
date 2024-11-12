import { PDFOptions } from "puppeteer";
export declare function generatePdf(htmlTemplatePath: string, data?: {}, pdfFormatDetails?: PDFOptions): Promise<Buffer>;
declare const _default: {
    generatePdf: typeof generatePdf;
};
export default _default;
