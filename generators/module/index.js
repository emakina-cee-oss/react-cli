const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('moduleName', { type: String, required: true });
    }


    /**
     * WRITING
     * Where you write the generator specific files (routes, controllers, etc)
     */
    writing() {
        this.log(`Spawning ${this._getModuleName()} ...`);
        this._copyFiles();
    }

    /**
     * GET SERVICE NAME
     * Ensures PascalCase with 'Module' postfix.
     *
     * @returns {string}
     * @private
     */
    _getModuleName() {
        let moduleNamePascalCase = changeCase.pascalCase(this.options.moduleName);
        return moduleNamePascalCase.endsWith('Module') ? moduleNamePascalCase : `${moduleNamePascalCase}Module`
    }

    /**
     * GET SERVICE NAME
     * Ensures PascalCase and strips a 'Module' postfix.
     *
     * @returns {string}
     * @private
     */
    _getModuleNameShort() {
        let moduleNamePascalCase = changeCase.pascalCase(this.options.modulesName);
        return moduleNamePascalCase.endsWith('Module') ? moduleNamePascalCase.replace('Module', '') : moduleNamePascalCase
    }

    /**
     * COPY FILES
     *
     * @private
     */
    _copyFiles() {
        this.fs.copy(
            this.templatePath('module.txt'),
            this.destinationPath(`src/modules/${this._getModuleNameShort()}/${this._getModuleName()}.js`)
        );
        this.fs.copyTpl(
            this.templatePath('module-test.txt'),
            this.destinationPath(`src/modules/${this._getModuleNameShort()}/${this._getModuleName()}.spec.js`),
            {
                moduleName: this._getModuleName(),
            }
        );
    }
};

module.exports = AppGenerator;
