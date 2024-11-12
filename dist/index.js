"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = generatePdf;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const handlebars_1 = __importDefault(require("handlebars"));
const readFile = util_1.default.promisify(fs_1.default.readFile);
// Loading HTML template
function getTemplateHtml(htmlTemplatePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let templatePath;
        try {
            templatePath = path_1.default.resolve(htmlTemplatePath);
            return yield readFile(templatePath, "utf8");
        }
        catch (err) {
            return Promise.reject("Could not load html template");
        }
    });
}
// Generating PDF
function generatePdf(htmlTemplatePath_1) {
    return __awaiter(this, arguments, void 0, function* (htmlTemplatePath, data = {}, pdfFormatDetails = {}) {
        let PDF;
        yield getTemplateHtml(htmlTemplatePath).then((res) => __awaiter(this, void 0, void 0, function* () {
            // Now we have the html code of our template in res object
            // you can check by logging it on console
            const template = handlebars_1.default.compile(res);
            const result = yield template(data);
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.setContent(result);
            PDF = yield page.pdf(pdfFormatDetails);
            yield browser.close();
        }));
        return PDF;
    });
}
exports.default = { generatePdf };
