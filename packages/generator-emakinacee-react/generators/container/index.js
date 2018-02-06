const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class ContainerGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('path', { type: String, required: true });
        this.option('stateful');
        this.option('connect');
    }

    /**
     * WRITING
     *
     * @returns {undefined}
     */
    writing() {
        const pathOptions = this._getPathOptions();
        this.log(`Spawning ${pathOptions.componentName} Container Component ...`);

        const templatesToCopy = [];

        if (this.options.connect) {
            templatesToCopy.push('container-connected.txt');
            templatesToCopy.push('test-connected.txt');
        } else if (this.options.stateful) {
            templatesToCopy.push('container-stateful.txt');
            templatesToCopy.push('test.txt');
        } else {
            templatesToCopy.push('container.txt');
            templatesToCopy.push('test.txt');
        }

        this._copyFiles(templatesToCopy, pathOptions);
    }

    _getPathOptions() {
        const pathOptions = {};
        const split = this.options.path.split('/');

        if (split[0] === '') split.shift();
        if (split[0] === '.') {
            pathOptions.noDefaultFolder = true;
            split.shift();
        }
        pathOptions.componentName = this._getName(split.pop());
        pathOptions.path = split.join('/');

        return pathOptions;
    }

    /**
     * GET NAME
     *
     * @param {String} name -
     * @returns {string} - valid component name
     * @private
     */
    _getName(name) {
        return changeCase.pascalCase(name);
    }

    /**
     * COPY FILES
     *
     * @param {Array} templatesToCopy - templates to copy
     * @param {Object} pathOptions - options to change where the files should be spawned
     * @returns {undefined}
     * @private
     */
    _copyFiles(templatesToCopy, pathOptions) {
        const path = pathOptions.noDefaultFolder
            ? `src/${pathOptions.path}/${pathOptions.componentName}/${pathOptions.componentName}`
            : `src/containers/${pathOptions.path}/${pathOptions.componentName}/${pathOptions.componentName}`;

        templatesToCopy.forEach((template) => {
            let fileEnding = 'js';
            if (template.includes('test')) fileEnding = 'spec.js';

            this.fs.copyTpl(
                this.templatePath(template),
                this.destinationPath(`${path}.${fileEnding}`),
                {
                    name: pathOptions.componentName,
                    nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(pathOptions.componentName)),
                }
            );
        });
    }
};

module.exports = ContainerGenerator;
