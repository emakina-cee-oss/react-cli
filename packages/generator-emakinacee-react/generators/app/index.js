const fs = require('fs');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.option('spa');
        this.option('yarn');

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
        this._copyStaticFiles('dot');
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
     * Install packages
     *
     * @returns {undefined}
     * @private
     */
    _packagesInstall() {
        const dependencies = [
            'react',
            'react-dom',
            'cerebral',
            '@cerebral/react',
            'sass-mq'
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
            'eslint',
            'eslint-plugin-import',
            'eslint-plugin-promise',
            'eslint-plugin-standard',
            'eslint-plugin-react',
            'eslint-plugin-jsx-a11y',
            'eslint-config-emakinacee-base',
            'eslint-config-emakinacee-react',
            'eslint-config-prettier',
            'prettier',
            'react-scripts-emakinacee',
            'serve'
        ];

        this.npmInstall(devDependencies, { 'save-dev': true });
    }
};

module.exports = AppGenerator;
