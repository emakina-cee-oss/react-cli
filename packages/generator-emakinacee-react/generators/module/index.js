const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true });
    }

    /**
     * INITIALIZING
     *
     * @returns {undefined}
     */
    initializing() {
        const yoConfig = this.config.getAll();
        this._useTS = (yoConfig && yoConfig.promptValues)
            ? yoConfig.promptValues.useTS
            : false;
    }

    /**
     * WRITING
     *
     * @returns {undefined}
     */
    writing() {
        this.log(`Spawning ${this._getName()} ...`);
        this._copyFiles();
    }

    /**
     * GET NAME
     *
     * @returns {string} - valid module name
     * @private
     */
    _getName() {
        const namePascalCase = changeCase.pascalCase(this.options.name);
        return namePascalCase.endsWith('Module') ? namePascalCase : `${namePascalCase}Module`;
    }

    /**
     * GET NAME SHORT
     *
     * @returns {string} - valid short name
     * @private
     */
    _getNameShort() {
        const namePascalCase = changeCase.pascalCase(this.options.name);
        return namePascalCase.endsWith('Module') ? namePascalCase.replace('Module', '') : namePascalCase;
    }

    /**
     * COPY FILES
     *
     * @returns {undefined}
     * @private
     */
    _copyFiles() {
        const scriptExtension = this._useTS ? 'ts' : 'js';

        this.fs.copyTpl(
            this.templatePath('module.txt'),
            this.destinationPath(`src/modules/${this._getNameShort()}/${this._getName()}.${scriptExtension}`),
            {
                nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(this._getName())),
            }
        );
    }
};

module.exports = AppGenerator;
