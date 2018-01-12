const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true });
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
        this.fs.copyTpl(
            this.templatePath('module.txt'),
            this.destinationPath(`src/modules/${this._getNameShort()}/${this._getName()}.js`),
            {
                nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(this._getName())),
            }
        );
    }
};

module.exports = AppGenerator;
