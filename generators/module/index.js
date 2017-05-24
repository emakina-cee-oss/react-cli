const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true });
    }

    /**
     * WRITING
     */
    writing() {
        this.log(`Spawning ${this._getName()} ...`);
        this._copyFiles();
    }

    /**
     * GET MODULE NAME
     * Ensures PascalCase with 'Module' postfix.
     *
     * @returns {string}
     * @private
     */
    _getName() {
        let namePascalCase = changeCase.pascalCase(this.options.name);
        return namePascalCase.endsWith('Module') ? namePascalCase : `${namePascalCase}Module`
    }

    /**
     * GET MODULE NAME
     * Ensures PascalCase and strips a 'Module' postfix.
     *
     * @returns {string}
     * @private
     */
    _getNameShort() {
        let namePascalCase = changeCase.pascalCase(this.options.name);
        return namePascalCase.endsWith('Module') ? namePascalCase.replace('Module', '') : namePascalCase
    }

    /**
     * COPY FILES
     *
     * @private
     */
    _copyFiles() {
        this.fs.copy(
            this.templatePath('module.txt'),
            this.destinationPath(`src/modules/${this._getNameShort()}/${this._getName()}.js`)
        );
        this.fs.copyTpl(
            this.templatePath('module-test.txt'),
            this.destinationPath(`src/modules/${this._getNameShort()}/${this._getName()}.spec.js`),
            {
                name: this._getName(),
            }
        );
    }
};

module.exports = AppGenerator;
