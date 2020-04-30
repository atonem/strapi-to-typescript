"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_exporter_1 = require("./ts-exporter");
const importer_1 = require("./importer");
const log = console.log;
const logError = console.error;
exports.exec = (options) => __awaiter(this, void 0, void 0, function* () {
    const files = yield importer_1.findFilesFromMultipleDirectories(...options.input);
    if (options.inputGroup) {
        files.push(...yield importer_1.findFiles(options.inputGroup, /.json/));
    }
    const strapiModels = yield importer_1.importFiles(files);
    ts_exporter_1.convert(options.output, strapiModels, options.nested, options.enum)
        .then((count) => {
        log(`Generated ${count} interfaces.`);
        process.exit(0);
    })
        .catch((err) => logError(err));
});
//# sourceMappingURL=processor.js.map