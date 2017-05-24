const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true });
        this.option('class');
    }

    /**
     * WRITING
     */
    writing() {
        this.log(`Spawning ${this._getName()} ...`);
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
    _getName() {
        return changeCase.pascalCase(this.options.name);
    }

    /**
     * COPY SHARED FILES
     *
     * @private
     */
    _copySharedFiles() {
        this.fs.copyTpl(
            this.templatePath('component-scss.txt'),
            this.destinationPath(`src/components/${this._getName()}/${this._getName()}.scss`),
            {
                name: this._getName(),
                nameDash: changeCase.paramCase(this._getName())
            }
        );
        this.fs.copyTpl(
            this.templatePath('component-test.txt'),
            this.destinationPath(`src/components/${this._getName()}/${this._getName()}.spec.js`),
            {
                name: this._getName(),
                nameDash: changeCase.paramCase(this._getName())
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
            this.destinationPath(`src/components/${this._getName()}/${this._getName()}.js`),
            {
                name: this._getName(),
                nameDash: changeCase.paramCase(this._getName())
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
            this.destinationPath(`src/components/${this._getName()}/${this._getName()}.js`),
            {
                name: this._getName(),
                nameDash: changeCase.paramCase(this._getName())
            }
        );
    }
};

module.exports = AppGenerator;
