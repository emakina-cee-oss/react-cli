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
     * @returns {string} - valid service name
     * @private
     */
    _getName() {
        const namePascalCase = changeCase.pascalCase(this.options.name);
        return namePascalCase.endsWith('Service') ? namePascalCase : `${namePascalCase}Service`;
    }

    /**
     * COPY FILES
     *
     * @returns {undefined}
     * @private
     */
    _copyFiles() {
        this.fs.copyTpl(
            this.templatePath('service-class.txt'),
            this.destinationPath(`src/shared/services/${this._getName()}.js`),
            {
                name: this._getName(),
                nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(this._getName()))
            }
        );
        this.fs.copyTpl(
            this.templatePath('service-test.txt'),
            this.destinationPath(`src/shared/services/${this._getName()}.spec.js`),
            {
                name: this._getName(),
            }
        );
    }
};

module.exports = AppGenerator;
