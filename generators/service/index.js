const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('serviceName', { type: String, required: true });
    }


    /**
     * WRITING
     * Where you write the generator specific files (routes, controllers, etc)
     */
    writing() {
        this.log(`Spawning ${this._getServiceName()} ...`);
        this._copyFiles();
    }

    /**
     * GET SERVICE NAME
     * Ensures PascalCase with 'Service' postfix.
     *
     * @returns {string}
     * @private
     */
    _getServiceName() {
        let serviceNamePascalCase = changeCase.pascalCase(this.options.serviceName);
        return serviceNamePascalCase.endsWith('Service') ? serviceNamePascalCase : `${serviceNamePascalCase}Service`
    }

    /**
     * COPY FILES
     *
     * @private
     */
    _copyFiles() {
        this.fs.copyTpl(
            this.templatePath('service-class.txt'),
            this.destinationPath(`src/shared/services/${this._getServiceName()}.js`),
            {
                serviceName: this._getServiceName(),
                serviceNameUpperCase: changeCase.upperCase(changeCase.sentenceCase(this._getServiceName()))
            }
        );
        this.fs.copyTpl(
            this.templatePath('service-test.txt'),
            this.destinationPath(`src/shared/services/${this._getServiceName()}.spec.js`),
            {
                serviceName: this._getServiceName(),
            }
        );
    }
};

module.exports = AppGenerator;
