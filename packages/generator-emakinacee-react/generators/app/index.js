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

        return this.prompt(prompts).then((answers) => {
            this._appName = answers.appName;
            this._appNameShort = answers.appNameShort;
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

        this.fs.copyTpl(
            this.templatePath('dynamic/package.json'),
            this.destinationPath('package.json'),
            {
                projectName: this.options.projectName
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
                this.fs.copy(
                    this.templatePath(`${path}/${file}`),
                    this.destinationPath(file)
                );
            });
        });
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
            'prop-types@15',
            'cerebral@4',
            '@cerebral/react@3',
            'sass-mq@4',
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
        const devDependencies = [
            'eslint@4',
            'eslint-plugin-import@2',
            'eslint-plugin-promise@3',
            'eslint-plugin-standard@3',
            'eslint-plugin-react@7',
            'eslint-plugin-jsx-a11y@6',
            'eslint-config-emakinacee-base@1',
            'eslint-config-emakinacee-react@2',
            'eslint-config-prettier@2',
            'prettier@1',
            'react-scripts@1',
            'react-app-rewired@1',
            'node-sass@4',
            'sass-loader@6',
            'serve@6',
            'react-styleguidist@6'
        ];

        this.npmInstall(devDependencies, { 'save-dev': true });
    }
};

module.exports = AppGenerator;
