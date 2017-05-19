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
        this.log(`Spawning component files ...`);
        this._copySharedFiles();

        if (this.options.class) {
            this._copyClassComponent();
        } else {
            this._copyStatelessComponent();
        }
    }

    /**
     * COPY SHARED FILES
     *
     * @private
     */
    _copySharedFiles() {
        this.fs.copyTpl(
            this.templatePath('component-scss.txt'),
            this.destinationPath(`src/components/${this.options.componentName}/${this.options.componentName}.scss`),
            {
                componentName: this.options.componentName,
                componentNameDash: changeCase.paramCase(this.options.componentName)
            }
        );
        this.fs.copyTpl(
            this.templatePath('component-test.txt'),
            this.destinationPath(`src/components/${this.options.componentName}/${this.options.componentName}.test.js`),
            {
                componentName: this.options.componentName,
                componentNameDash: changeCase.paramCase(this.options.componentName)
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
            this.destinationPath(`src/components/${this.options.componentName}/${this.options.componentName}.js`),
            {
                componentName: this.options.componentName,
                componentNameDash: changeCase.paramCase(this.options.componentName)
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
            this.destinationPath(`src/components/${this.options.componentName}/${this.options.componentName}.js`),
            {
                componentName: this.options.componentName,
                componentNameDash: changeCase.paramCase(this.options.componentName)
            }
        );
    }
};

module.exports = AppGenerator;
