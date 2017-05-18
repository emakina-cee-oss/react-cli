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
     * Your initialization methods (checking current project state, getting configs, etc)
     */
    initializing() {
        this.log(`1. Creating project folder (${this.options.projectName}) ...`);
        this._createProjectFolder();
    }

    /**
     * PROMTING
     * Where you prompt users for options (where you'd call this.prompt())
     */
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'appName',
                message: 'The name of your app (used in the manifest)',
                default: this.options.projectName
            }
        ]).then((answers) => {
            this._appName = answers.appName;
        });
    }

    /**
     * CONFIGURING
     * Saving configurations and configure the project (creating .editorconfig files and other metadata files)
     */
    configuring() {
        this.log(`2. Spawn dot files ...`);
        this._copyStaticTemplates('dot');
    }

    /**
     * DEFAULT
     * If the method name doesn't match a priority, it will be pushed to this group.
     */
    default() {}

    /**
     * WRITING
     * Where you write the generator specific files (routes, controllers, etc)
     */
    writing() {
        this.log(`3. Spawn initial project files ...`);
        this._copyStaticTemplates('static');
        this._copyDynamicTemplates();
    }

    /**
     * INSTALL
     * Where installations are run (npm, bower)
     */
    install() {
        this.log(`4. Installing dependencies ...`);
        // this._yarn();
        // this._yarnDev();
    }

    /**
     * END
     * Called last, cleanup, say good bye, etc
     */
    end() {
        this.log(`5. Awesome! Type cd ${this.options.projectName} and you are ready to code!`);
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

    /**
     * COPY TEMPLATES
     *
     * @private
     */
    _copyDynamicTemplates() {
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
                appNameShort: this._escapeAppName(this._appName)
            }
        );
    }

    /**
     * COPY STATIC TEMPLATES
     *
     * @private
     */
    _copyStaticTemplates(folderName) {
        fs.readdir(this.templatePath(folderName), (err, files) => {
            files.forEach((file) => {
                this.fs.copy(
                    this.templatePath(`${folderName}/${file}`),
                    this.destinationPath(file)
                )
            })
        });
    }

    /**
     * YARN
     *
     * @private
     */
    _yarn() {
        this.yarnInstall([
            'react',
            'react-dom'
        ])
    }

    /**
     * YARN DEV
     *
     * @private
     */
    _yarnDev() {
        this.yarnInstall([
            'react-scripts',
            'sw-precache'
        ], { 'dev': true });
    }

    /**
     * ESCAPE APP NAME
     *
     * @param name
     * @returns {string}
     * @private
     */
    _escapeAppName(name) {
        return name
            .toLowerCase()
            .replace(/ä+/g, 'ae')
            .replace(/Ä+/g, 'Ae')
            .replace(/ö+/g, 'oe')
            .replace(/Ö+/g, 'Oe')
            .replace(/ü+/g, 'ue')
            .replace(/Ü+/g, 'Ue')
            .replace(/\s+/g, '_')
            .replace(/\W+/g, '')
            .replace(/[_]/g, '-');
    }
};

module.exports = AppGenerator;
