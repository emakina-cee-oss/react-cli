const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.option('class'); // Should be a class component, stateless by default.
        this.argument('componentName', { type: String, required: true });
    }


    /**
     * WRITING
     * Where you write the generator specific files (routes, controllers, etc)
     */
    writing() {
        this.log(`Spawning ${this._getComponentName()} ...`);
        this._copySharedFiles();

        if (this.options.class) {
            this._copyClassComponent();
        } else {
            this._copyStatelessComponent();
        }
    }

    /**
     * GET COMPONENT NAME
     * Ensures PascalCase.
     *
     * @returns {string}
     * @private
     */
    _getComponentName() {
        return changeCase.pascalCase(this.options.componentName);
    }

    /**
     * COPY SHARED FILES
     *
     * @private
     */
    _copySharedFiles() {
        this.fs.copyTpl(
            this.templatePath('component-scss.txt'),
            this.destinationPath(`src/components/${this._getComponentName()}/${this._getComponentName()}.scss`),
            {
                componentName: this._getComponentName(),
                componentNameDash: changeCase.paramCase(this._getComponentName())
            }
        );
        this.fs.copyTpl(
            this.templatePath('component-test.txt'),
            this.destinationPath(`src/components/${this._getComponentName()}/${this._getComponentName()}.spec.js`),
            {
                componentName: this._getComponentName(),
                componentNameDash: changeCase.paramCase(this._getComponentName())
            }
        );
    }

    /**
     * COPY BASE FILES
     *
     * @private
     */
    _copyClassComponent() {
        this.fs.copyTpl(
            this.templatePath('component-class.txt'),
            this.destinationPath(`src/components/${this._getComponentName()}/${this._getComponentName()}.js`),
            {
                componentName: this._getComponentName(),
                componentNameDash: changeCase.paramCase(this._getComponentName())
            }
        );
    }

    /**
     * COPY BASE FILES
     *
     * @private
     */
    _copyStatelessComponent() {
        this.fs.copyTpl(
            this.templatePath('component-stateless.txt'),
            this.destinationPath(`src/components/${this._getComponentName()}/${this._getComponentName()}.js`),
            {
                componentName: this._getComponentName(),
                componentNameDash: changeCase.paramCase(this._getComponentName())
            }
        );
    }
};

module.exports = AppGenerator;
