const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true });
        this.argument('module', { type: String, required: false });
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
     * @returns {string}- valid factory name
     * @private
     */
    _getName() {
        const nameCamelCase = changeCase.camelCase(this.options.name);
        return nameCamelCase.endsWith('Factory') ? nameCamelCase : `${nameCamelCase}Factory`;
    }

    /**
     * GET MODULE
     *
     * @returns {string} - valid module name
     * @private
     */
    _getModule() {
        return changeCase.pascalCase(this.options.module);
    }

    /**
     * GET PATH
     *
     * @returns {string} - valid path
     * @private
     */
    _getPath() {
        return (this._getModule()) ? `src/modules/${this._getModule()}/factories` : 'src/shared/factories';
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
            this.templatePath('factory.txt'),
            this.destinationPath(`${this._getPath()}/${this._getName()}.${scriptExtension}`),
            {
                name: this._getName(),
                nameInner: this._getName().replace('Factory', ''),
                nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(this._getName())),
            }
        );
        this.fs.copyTpl(
            this.templatePath('factory-test.txt'),
            this.destinationPath(`${this._getPath()}/${this._getName()}.spec.${scriptExtension}`),
            {
                name: this._getName(),
                nameInner: this._getName().replace('Factory', ''),
            }
        );
    }
};

module.exports = AppGenerator;
