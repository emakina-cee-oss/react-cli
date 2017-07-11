const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true });
        this.argument('module', { type: String, required: false });
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
     * @returns {string} - valid compute name
     * @private
     */
    _getName() {
        const nameCamelCase = changeCase.camelCase(this.options.name);
        return nameCamelCase.endsWith('Compute') ? nameCamelCase : `${nameCamelCase}Compute`;
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
        return (this._getModule()) ? `src/modules/${this._getModule()}/computes` : 'src/shared/computes';
    }

    /**
     * COPY FILES
     *
     * @returns {undefined}
     * @private
     */
    _copyFiles() {
        this.fs.copyTpl(
            this.templatePath('compute.txt'),
            this.destinationPath(`${this._getPath()}/${this._getName()}.js`),
            {
                name: this._getName(),
                nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(this._getName())),
            }
        );
        this.fs.copyTpl(
            this.templatePath('compute-test.txt'),
            this.destinationPath(`${this._getPath()}/${this._getName()}.spec.js`),
            {
                name: this._getName(),
            }
        );
    }
};

module.exports = AppGenerator;
