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
     */
    initializing() {
        this.log(`1. Creating project folder (${this.options.projectName}) ...`);
        this._createProjectFolder();

        // this._appName = this.options.projectName;
        // this._appNameShort = this.options.projectName;
    }

    /**
     * PROMTING
     */
    prompting() {
        const prompts = [];

        if (this.options.spa) {
            prompts.push({
                type: 'input',
                name: 'appName',
                message: 'The name of your app (used in the manifest)',
                default: this.options.projectName
            });
            prompts.push({
                type: 'input',
                name: 'appNameShort',
                message: 'A short name for use as the text on the users home screen',
                default: this.options.projectName
            });
        }

        return this.prompt(prompts).then((answers) => {
            if (this.options.spa) {
                this._appName = answers.appName;
                this._appNameShort = answers.appNameShort;
            }
        });
    }

    /**
     * CONFIGURING
     */
    configuring() {
        this.log(`2. Spawn dot files ...`);
        this._copyStaticFiles('shared/dot');
    }

    /**
     * WRITING
     */
    writing() {
        this.log(`3. Spawn initial project files ...`);
        this._copySharedFiles();

        if (this.options.spa) {
            this._copySpaFiles();
        } else {
            this._copyBaseFiles();
        }
    }

    /**
     * INSTALL
     */
    install() {
        this.log(`4. Installing dependencies ...`);
        this._packagesInstall();
        this._devPackagesInstall();
    }

    /**
     * END
     */
    end() {
        this.log(`5. DONE - Awesome!`);
    }

    /**
     * CREATE PROJECT FOLDER
     *
     * @private
     */
    _createProjectFolder() {
        mkdirp(this.options.projectName);
        this.destinationRoot(this.destinationPath(this.options.projectName));
    }

    _copySharedFiles() {
        this._copyStaticFiles('shared/static');
    }

    /**
     * COPY BASE FILES
     *
     * @private
     */
    _copyBaseFiles() {
        this._copyStaticFiles('base/static');

        // Dynamic Templates
        this.fs.copyTpl(
            this.templatePath('base/dynamic/package.json'),
            this.destinationPath('package.json'),
            {
                projectName: this.options.projectName
            }
        );
    }

    /**
     * COPY SPA FILES
     * Files only needed for Single Page Applications
     *
     * @private
     */
    _copySpaFiles() {
        this._copyStaticFiles('spa/static');

        // Dynamic Templates
        this.fs.copyTpl(
            this.templatePath('spa/dynamic/package.json'),
            this.destinationPath('package.json'),
            {
                projectName: this.options.projectName
            }
        );

        this.fs.copyTpl(
            this.templatePath('spa/dynamic/manifest.json'),
            this.destinationPath('public/manifest.json'),
            {
                appName: this._appName,
                appNameShort: this._appNameShort
            }
        );
    }

    /**
     * COPY STATIC TEMPLATES
     *
     * @private
     */
    _copyStaticFiles(path) {
        fs.readdir(this.templatePath(path), (err, files) => {
            files.forEach((file) => {
                this.fs.copy(
                    this.templatePath(`${path}/${file}`),
                    this.destinationPath(file)
                )
            })
        });
    }

    /**
     * Install packages
     *
     * @private
     */
    _packagesInstall() {
        const dependencies = [
            'react',
            'react-dom',
            'sass-mq'
        ];

        if (this.options.spa) {
            dependencies.push('cerebral@beta');
            dependencies.push('@cerebral/router');
        }

        if (this.options.yarn) {
            this.yarnInstall(dependencies);
        } else {
            this.npmInstall(dependencies, { 'save': true });
        }
    }

    /**
     * Install dev-packages
     *
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
            'react-scripts',
            'node-sass-chokidar',
            'npm-run-all',
            'serve'
        ];

        if (this.options.spa) {}

        if (this.options.yarn) {
            this.yarnInstall(devDependencies, { 'dev': true });
        } else {
            this.npmInstall(devDependencies, { 'save-dev': true });
        }
    }
};

module.exports = AppGenerator;