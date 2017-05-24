const fs = require('fs');
const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('type', { type: String, required: true });
        this.argument('name', { type: String, required: true });
        this.argument('module', { type: String, required: false });

        this.option('class');
    }

    /**
     * INITIALIZING
     */
    initializing() {
        this._module = this.options.module ? changeCase.pascalCase(this.options.module) : null;
        this._moduleDoesNotExist = (this._module && !fs.existsSync(`src/modules/${this._module}`));
    }

    /**
     * PROMTING
     */
    prompting() {
        if (this._moduleDoesNotExist && this._isNestableType()) {
            const prompts = [{
                type: 'confirm',
                name: 'createModule',
                message: `The module ${this._module} does not exist. Would you like to add it?`
            }];

            return this.prompt(prompts).then((answers) => {
                this._createModule = answers.createModule;
            });
        }
    }

    /**
     * DEFAULT
     */
    default() {
        if (this._createModule) {
            this.composeWith(require.resolve('../module'), {
                arguments: [this._module],
            });
        }

        switch(this.options.type) {
            case 'component':
                this.composeWith(require.resolve('../component'), {
                    arguments: [this.options.name],
                    class: this.options.class
                });
                break;

            case 'service':
                this.composeWith(require.resolve('../service'), {
                    arguments: [this.options.name]
                });
                break;

            case 'module':
                this.composeWith(require.resolve('../module'), {
                    arguments: [this.options.name]
                });
                break;

            case 'action':
                const args = [this.options.name];
                if (this.options.module) args.push(this.options.module);

                this.composeWith(require.resolve('../action'), {
                    arguments: args
                });
                break;
        }
    }

    /**
     * IS NESTABLE TYPE
     * Return if the current type can be nested in a module.
     *
     * @returns {boolean}
     * @private
     */
    _isNestableType() {
        const nestableTypes = ['action', 'factory', 'compute'];
        return nestableTypes.indexOf(this.options.type) > -1;
    }
};

module.exports = AppGenerator;
