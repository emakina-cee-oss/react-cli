const fs = require('fs');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('projectName', { type: String, required: true });
    }

    /**
     * INITIALIZING
     *
     * @returns {undefined}
     */
    initializing() {
        this.log(`1. Creating project folder (${this.options.projectName}) ...`);
        this._createProjectFolder();
    }

    /**
     * PROMTING
     *
     * @returns {undefined}
     */
    prompting() {
        const prompts = [];

        prompts.push({
            type: 'input',
            name: 'appName',
            message: 'Manifest Name',
            default: this.options.projectName
        });

        prompts.push({
            type: 'input',
            name: 'appNameShort',
            message: 'Manifest Short Name',
            default: this.options.projectName
        });

        prompts.push({
            type: 'confirm',
            name: 'useTS',
            message: 'Add support for typescript',
            default: true,
            store: true
        });

        prompts.push({
            type: 'confirm',
            name: 'saveExact',
            message: 'Save exact npm-versions',
            default: false
        });

        return this.prompt(prompts).then((answers) => {
            this._appName = answers.appName;
            this._appNameShort = answers.appNameShort;
            this._useTS = answers.useTS;
            this._saveExact = answers.saveExact;
        });
    }

    /**
     * CONFIGURING
     *
     * @returns {undefined}
     */
    configuring() {
        this.log('2. Spawn dot files ...');
        this._copyStaticFiles('dot/static');
        if (this._useTS) {
            this._copyStaticFiles('dot/static-ts');
        } else {
            this._copyStaticFiles('dot/static-js');
        }
        if (this._saveExact) {
            this._copyStaticFile('dot/optional', '.npmrc');
        }
        this._copyGitIgnore();
    }

    /**
     * WRITING
     *
     * @returns {undefined}
     */
    writing() {
        this.log('3. Spawn initial project files ...');
        this._copyStaticFiles('static');
        let additionalScripts = '';
        if (this._useTS) {
            this._copyStaticFiles('static-ts');
            additionalScripts = '"typecheck": "tsc",\n    "typecheck:watch": "tsc --watch",';
        } else {
            this._copyStaticFiles('static-js');
        }

        this.fs.copyTpl(
            this.templatePath('dynamic/package.json'),
            this.destinationPath('package.json'),
            {
                projectName: this.options.projectName,
                additionalScripts: additionalScripts
            }
        );

        this.fs.copyTpl(
            this.templatePath('dynamic/manifest.json'),
            this.destinationPath('public/manifest.json'),
            {
                appName: this._appName,
                appNameShort: this._appNameShort
            }
        );
    }

    /**
     * INSTALL
     *
     * @returns {undefined}
     */
    install() {
        this.log('4. Installing dependencies ...');
        this._packagesInstall();
        this._devPackagesInstall();
    }

    /**
     * END
     *
     * @returns {undefined}
     */
    end() {
        this.log('5. DONE - Awesome!');
    }

    /**
     * CREATE PROJECT FOLDER
     *
     * @returns {undefined}
     * @private
     */
    _createProjectFolder() {
        mkdirp(this.options.projectName);
        this.destinationRoot(this.destinationPath(this.options.projectName));
    }

    /**
     * COPY STATIC TEMPLATES
     *
     * @param {string} path - destination to copy templates
     * @returns {undefined}
     * @private
     */
    _copyStaticFiles(path) {
        fs.readdir(this.templatePath(path), (err, files) => {
            if (err) this.log(err);

            files.forEach((file) => {
                this._copyStaticFile(path, file);
            });
        });
    }

    _copyStaticFile(path, file) {
        this.fs.copy(
            this.templatePath(`${path}/${file}`),
            this.destinationPath(file)
        );
    }

    /**
     * COPY GITIGNORE FILE
     *
     * @returns {undefined}
     * @private
     */
    _copyGitIgnore() {
        this.fs.copyTpl(
            this.templatePath('dot/gitignoreTemplate.txt'),
            this.destinationPath('.gitignore')
        );
    }

    /**
     * Install packages
     *
     * @returns {undefined}
     * @private
     */
    _packagesInstall() {
        const dependencies = [
            'react@16',
            'react-dom@16',
            'cerebral@4',
            '@cerebral/react@3',
            'classnames@2'
        ];

        this.npmInstall(dependencies, { 'save': true });
    }

    /**
     * Install dev-packages
     *
     * @returns {undefined}
     * @private
     */
    _devPackagesInstall() {
        const devDependenciesShared = [
            '@babel/preset-stage-3', // needed for styleguidist@7 to compile down dynamic import
            'node-sass@4',
            'prettier@1',
            'react-app-rewired@2',
            'react-scripts@next',
            'react-styleguidist@7',
            'react-app-rewire-workbox@2',
            'sass-mq@4',
            'serve@6',
            'workbox-webpack-plugin@3',
        ];

        const devDependenciesJS = [].concat(devDependenciesShared, [
            'prop-types@15',
            'eslint-plugin-import@2',
            'eslint-plugin-promise@3',
            'eslint-plugin-standard@3',
            'eslint-plugin-react@7',
            'eslint-plugin-jsx-a11y@6',
            'eslint-config-emakinacee-base@2',
            'eslint-config-emakinacee-react@3',
            'eslint-config-prettier@2',
        ]);

        const devDependenciesTS = [].concat(devDependenciesShared, [
            '@babel/preset-typescript',
            '@types/react@16',
            '@types/react-dom@16',
            '@types/jest@22',
            'react-app-rewire-typescript-babel-preset@2',
            'react-docgen-typescript', // needed for styleguidist with ts
            'typescript@2',
        ]);
        const devDependencies = this._useTS ? devDependenciesTS : devDependenciesJS;
        this.npmInstall(devDependencies, { 'save-dev': true });
    }
};

module.exports = AppGenerator;
