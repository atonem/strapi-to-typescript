"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const npmPackage = __importStar(require("../package.json"));
const command_line_usage_1 = __importDefault(require("command-line-usage"));
const command_line_args_1 = __importDefault(require("command-line-args"));
const processor_1 = require("./processor");
const log = console.log;
class CommandLineInterface {
}
CommandLineInterface.optionDefinitions = [
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        typeLabel: '{underline Boolean}',
        description: 'Show help text.',
    },
    {
        name: 'input',
        alias: 'i',
        type: String,
        multiple: true,
        typeLabel: '{underline String}',
        defaultOption: true,
        description: 'Input folder with the Strapi models (api folder).',
    },
    {
        name: 'inputGroup',
        alias: 'g',
        type: String,
        typeLabel: '{underline String}',
        defaultValue: undefined,
        description: 'Input folder with the Strapi models (groups folder).',
    },
    {
        name: 'output',
        alias: 'o',
        type: String,
        typeLabel: '{underline String}',
        defaultValue: '.',
        description: 'Output folder with the TypeScript models.',
    },
    {
        name: 'nested',
        alias: 'n',
        type: Boolean,
        typeLabel: '{underline Boolean}',
        defaultValue: false,
        description: 'If true, add each interface in its own folder.',
    },
    {
        name: 'enum',
        alias: 'e',
        type: Boolean,
        typeLabel: '{underline Boolean}',
        defaultValue: false,
        description: 'If true, Enumeration is generate, else string literal types is used',
    },
];
CommandLineInterface.sections = [
    {
        header: `${npmPackage.name.toUpperCase()}, v${npmPackage.version}`,
        content: `${npmPackage.license} license.

    ${npmPackage.description}`,
    },
    {
        header: 'Options',
        optionList: CommandLineInterface.optionDefinitions,
    },
    {
        header: 'Examples',
        content: [
            {
                desc: '01. Convert the Strapi API folder and write the results to current folder.',
                example: '$ sts [PATH\\TO\\API]',
            },
            {
                desc: '02. Convert the Strapi API folder and write the results to output folder.',
                example: '$ sts [PATH\\TO\\API] -o [PATH\\TO\\OUTPUT]',
            },
            {
                desc: '03. Add each interface to its own folder.',
                example: '$ sts [PATH\\TO\\API] -o [PATH\\TO\\OUTPUT] -n',
            },
            {
                desc: '04. Define multiple input folders.',
                example: '$ sts [PATH\\TO\\API] [PATH\\TO\\Plugin] [PATH\\TO\\Another_Plugin]',
            },
        ],
    },
];
exports.CommandLineInterface = CommandLineInterface;
const options = command_line_args_1.default(CommandLineInterface.optionDefinitions);
if (options.help || !options.input) {
    const usage = command_line_usage_1.default(CommandLineInterface.sections);
    log(usage);
    process.exit(0);
}
else {
    // Do your thing
    processor_1.exec(options);
}
//# sourceMappingURL=cli.js.map