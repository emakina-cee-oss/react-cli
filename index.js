#!/usr/bin/env node
const program = require('commander');
const shell = require('shelljs');
const packageInfo = require('./package.json');
const childProcess = require('child_process');


program.version(packageInfo.version);

program
    .command('init')
    .action(() => {
        shell.exec('npm install -g yo generator-emakinacee-react');
    });

// NEW COMMAND 'new'
program
    .command('new <name>')
    .option('-s, --spa', 'Create new single page application')
    .option('-y, --yarn', 'Use Yarn')
    .action((name, options) => {
        const args = [];
        args.push('emakinacee-react');
        args.push(name);
        if (options.spa) args.push('--spa');
        if (options.yarn) args.push('--yarn');

        // console.log(`yo emakinacee-react ${name} ${opts.join(' ')}`);
        // shell.exec(`C:/Users/daniel.goerdes/AppData/Roaming/npm/node_modules/emakina-react-cli/yo.sh`);

        const child = childProcess.spawn('yo', args, {stdio: 'inherit'});
        // child.stdout.pipe(process.stdout);
        // child.stderr.pipe(process.stderr);
        // process.stdin.pipe(child.stdin);
        // process.stdin.resume();
        //
        // child.on('exit', (code, signal) => {
        //     process.stdin.pause();
        //     console.log(arguments);
        // });
    });

// GENERATE COMMAND 'g'
program
    .command('g <type> <name> [module]')
    .option('-c, --connect', 'Connect Component to Cerebral')
    .option('--class', 'Generate Component in ES6 Class Syntax')
    .action((type, name, module, options) => {
        const opts = [];
        if (options.connect) opts.push('--connect');
        if (options.class) opts.push('--class');

        let commandString = `yo emakinacee-react:gen ${type} ${name}`;
        if (module) commandString += ` ${module}`;

        // console.log(`${commandString} ${opts.join(' ')}`);
        shell.exec(`${commandString} ${opts.join(' ')}`);
    });

program.parse(process.argv);
