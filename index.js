#!/usr/bin/env node
const {join} = require('path');
const {spawnSync} = require('child_process');
const program = require('commander');
const packageInfo = require('./package.json');


program.version(packageInfo.version);

// Add command to generate a new project.
program
    .command('new <name>')
    .option('-s, --spa', 'Create new single page application')
    .option('-y, --yarn', 'Use Yarn')
    .action((name, options) => {
        const args = [
            'emakinacee-react',
            name
        ];
        if (options.spa) args.push('--spa');
        if (options.yarn) args.push('--yarn');

        spawnSync(join(__dirname, 'node_modules', '.bin', 'yo'), args, {
            stdio: 'inherit',
            shell: true
        });
    });

// Add command to generate new files.
program
    .command('g <type> <name> [module]')
    .option('-c, --connect', 'Connect Component to Cerebral')
    .option('--class', 'Generate Component in ES6 Class Syntax')
    .action((type, name, module, options) => {
        const args = [
            'emakinacee-react:gen',
            type,
            name
        ];
        if (module) args.push(module);
        if (options.connect) args.push('--connect');
        if (options.class) args.push('--class');

        spawnSync(join(__dirname, 'node_modules', '.bin', 'yo'), args, {
            stdio: 'inherit',
            shell: true
        });
    });

program.parse(process.argv);

// Show help if no args applied.
if (!program.args.length) {
    program.help();
}
