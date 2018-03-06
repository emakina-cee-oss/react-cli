const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class SignalGenerator extends Generator {

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
     * @returns {string} - valid action name.
     * @private
     */
    _getName() {
        const nameCamelCase = changeCase.camelCase(this.options.name);
        return nameCamelCase.endsWith('Signal') ? nameCamelCase : `${nameCamelCase}Signal`;
    }

    /**
     * GET MODULE
     *
     * @returns {string} - valid module name.
     * @private
     */
    _getModule() {
        return changeCase.pascalCase(this.options.module);
    }

    /**
     * GET PATH
     * Return path where the action should be spawned.
     *
     * @returns {string} - valid path
     * @private
     */
    _getPath() {
        return (this._getModule()) ? `src/modules/${this._getModule()}/signals` : 'src/shared/signals';
    }

    /**
     * COPY FILES
     *
     * @returns {undefined}
     * @private
     */
    _copyFiles() {
        this.fs.copyTpl(
            this.templatePath('signal.txt'),
            this.destinationPath(`${this._getPath()}/${this._getName()}.js`),
            {
                name: this._getName(),
                nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(this._getName())),
            }
        );
        this.fs.copyTpl(
            this.templatePath('signal-test.txt'),
            this.destinationPath(`${this._getPath()}/${this._getName()}.spec.js`),
            {
                name: this._getName(),
            }
        );
    }
};

module.exports = SignalGenerator;
