const fs = require('fs');
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
     */
    writing() {
        this.log(`Spawning ${this._getName()} ...`);
        this._copyFiles();
    }

    /**
     * GET ACTION NAME
     * Ensures camelCase with 'Action' postfix.
     *
     * @returns {string}
     * @private
     */
    _getName() {
        let nameCamelCase = changeCase.camelCase(this.options.name);
        return nameCamelCase.endsWith('Factory') ? nameCamelCase : `${nameCamelCase}Factory`
    }

    /**
     * GET ACTION NAME
     * Ensures camelCase with 'Action' postfix.
     *
     * @returns {string}
     * @private
     */
    _getModule() {
        return changeCase.pascalCase(this.options.module);
    }

    /**
     * GET PATH
     * Return path where the action should be spawned.
     *
     * @returns {string}
     * @private
     */
    _getPath() {
        return (this._getModule()) ? `src/modules/${this._getModule()}/factories` : 'src/shared/factories';
    }

    /**
     * COPY FILES
     *
     * @private
     */
    _copyFiles() {
        this.fs.copyTpl(
            this.templatePath('factory.txt'),
            this.destinationPath(`${this._getPath()}/${this._getName()}.js`),
            {
                name: this._getName(),
                nameInner: this._getName().replace('Factory', ''),
                nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(this._getName())),
            }
        );
        this.fs.copyTpl(
            this.templatePath('factory-test.txt'),
            this.destinationPath(`${this._getPath()}/${this._getName()}.spec.js`),
            {
                name: this._getName(),
                nameInner: this._getName().replace('Factory', ''),
            }
        );
    }
};

module.exports = AppGenerator;
