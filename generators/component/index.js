const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: true });
        this.option('class');
        this.option('connect');
    }

    /**
     * WRITING
     */
    writing() {
        this.log(`Spawning ${this._getName()} ...`);

        const templatesToCopy = [
            'component-scss.txt'
        ];

        if (this.options.connect) {
            templatesToCopy.push('component-connected.txt');
            templatesToCopy.push('component-connected-test.txt')
        } else if (this.options.class) {
            templatesToCopy.push('component-class.txt');
            templatesToCopy.push('component-test.txt')
        } else {
            templatesToCopy.push('component.txt');
            templatesToCopy.push('component-test.txt')
        }

        this._copyFiles(templatesToCopy);
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
     * COPY FILES
     *
     * @param templatesToCopy
     * @private
     */
    _copyFiles(templatesToCopy) {
        templatesToCopy.forEach((template) => {
            let fileEnding = 'js';
            if (template.includes('test')) fileEnding = 'spec.js';
            if (template.includes('scss')) fileEnding = 'scss';

            this.fs.copyTpl(
                this.templatePath(template),
                this.destinationPath(`src/components/${this._getName()}/${this._getName()}.${fileEnding}`),
                {
                    name: this._getName(),
                    nameDash: changeCase.paramCase(this._getName())
                }
            );
        });
    }
};

module.exports = AppGenerator;
