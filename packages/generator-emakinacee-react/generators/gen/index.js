const fs = require('fs');
const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class AppGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('type', { type: String, required: true });
        this.argument('name', { type: String, required: true });
        this.argument('module', { type: String, required: false });

        this.option('stateful');
        this.option('connect');
    }

    /**
     * INITIALIZING
     *
     * @returns {undefined}
     */
    initializing() {
        this._module = this.options.module ? changeCase.pascalCase(this.options.module) : null;
        this._moduleDoesNotExist = (this._module && !fs.existsSync(`src/modules/${this._module}`));
    }

    /**
     * PROMTING
     *
     * @returns {undefined}
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
     *
     * @returns {undefined}
     */
    default() {
        if (this._createModule) {
            this.composeWith(require.resolve('../module'), {
                arguments: [this._module],
            });
        }

        const args = [this.options.name];
        if (this.options.module) args.push(this.options.module);

        switch (this.options.type) {
            case 'component':
                this.composeWith(require.resolve('../component'), {
                    arguments: args,
                    stateful: this.options.stateful,
                    connect: this.options.connect
                });
                break;

            case 'service':
                this.composeWith(require.resolve('../service'), {
                    arguments: args
                });
                break;

            case 'module':
                this.composeWith(require.resolve('../module'), {
                    arguments: args
                });
                break;

            case 'action':
                this.composeWith(require.resolve('../action'), {
                    arguments: args
                });
                break;

            case 'signal':
                this.composeWith(require.resolve('../signal'), {
                    arguments: args
                });
                break;

            case 'factory':
                this.composeWith(require.resolve('../factory'), {
                    arguments: args
                });
                break;

            case 'compute':
                this.composeWith(require.resolve('../compute'), {
                    arguments: args
                });
                break;

            default:
                this.log(`Nothing is defined for type "${this.options.type}".`);
        }
    }

    /**
     * IS NESTABLE TYPE
     * Return if the current type can be nested in a module.
     *
     * @returns {boolean} - if it is nestable in module.
     * @private
     */
    _isNestableType() {
        const nestableTypes = ['action', 'factory', 'compute'];
        return nestableTypes.indexOf(this.options.type) > -1;
    }
};

module.exports = AppGenerator;
