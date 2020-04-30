"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Recursively walk a directory asynchronously and obtain all file names (with full path).
 *
 * @param dir Folder name you want to recursively process
 * @param done Callback function to return the results when the processing is done. Returns all files with full path.
 * @param filter Optional filter to specify which files to include, e.g. for json files: (f: string) => /.json$/.test(f)
 */
const walk = (dir, done, filter) => {
    let foundFiles = [];
    fs.readdir(dir, (err, list) => {
        if (err) {
            return done(err);
        }
        let pending = list.length;
        if (!pending) {
            return done(null, foundFiles);
        }
        list.forEach((file) => {
            file = path.resolve(dir, file);
            // tslint:disable-next-line:variable-name
            fs.stat(file, (_err2, stat) => {
                if (stat && stat.isDirectory()) {
                    walk(file, 
                    // tslint:disable-next-line:variable-name
                    (_err3, res) => {
                        if (res) {
                            foundFiles = foundFiles.concat(res);
                        }
                        if (!--pending) {
                            done(null, foundFiles);
                        }
                    }, filter);
                }
                else {
                    if (typeof filter === 'undefined' || (filter && filter(file))) {
                        foundFiles.push(file);
                    }
                    if (!--pending) {
                        done(null, foundFiles);
                    }
                }
            });
        });
    });
};
exports.findFiles = (dir, ext = /.settings.json$/) => new Promise((resolve, reject) => {
    const filter = (f) => ext.test(f);
    walk(dir, (err, files) => {
        if (err) {
            reject(err);
        }
        else if (files) {
            resolve(files);
        }
    }, filter);
});
/**
 * Wrapper around "findFiles".
 *
 */
function findFilesFromMultipleDirectories(...files) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = [...new Set(files)];
        var actions = inputs.map(i => exports.findFiles(i)); // run the function over all items
        // we now have a promises array and we want to wait for it
        var results = yield Promise.all(actions); // pass array of promises
        // flatten
        return (new Array()).concat.apply([], results);
    });
}
exports.findFilesFromMultipleDirectories = findFilesFromMultipleDirectories;
/*
 */
exports.importFiles = (files) => new Promise((resolve, reject) => {
    let pending = files.length;
    const results = [];
    files.forEach((f) => fs.readFile(f, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            reject(err);
        }
        pending--;
        results.push(Object.assign(JSON.parse(data), { _filename: f }));
        if (pending === 0) {
            resolve(results);
        }
    }));
});
//# sourceMappingURL=importer.js.map