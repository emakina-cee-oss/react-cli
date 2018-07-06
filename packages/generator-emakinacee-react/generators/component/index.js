const Generator = require('yeoman-generator');
const changeCase = require('change-case');

class ComponentGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('path', { type: String, required: true });
        this.option('stateful');
        this.option('connect');
    }

    /**
     * INITIALIZING
     *
     * @returns {undefined}
     */
    initializing() {
        const yoConfig = this.config.getAll();
        this._useTS = (yoConfig && yoConfig.promptValues)
            ? yoConfig.promptValues.useTS
            : false;
    }

    /**
     * WRITING
     *
     * @returns {undefined}
     */
    writing() {
        const pathOptions = this._getPathOptions();
        const subfolder = this._useTS ? 'typescript' : 'javascript';
        const templatesToCopy = [
            'shared/styles.txt',
        ];

        if (!this._useTS) {
            templatesToCopy.push('shared/styleguide.md');
        }

        if (this.options.connect) {
            templatesToCopy.push(`${subfolder}/component-connected.txt`);
            templatesToCopy.push(`${subfolder}/test-connected.txt`);
        } else if (this.options.stateful) {
            templatesToCopy.push(`${subfolder}/component-stateful.txt`);
            templatesToCopy.push(`${subfolder}/test.txt`);
        } else {
            templatesToCopy.push(`${subfolder}/component.txt`);
            templatesToCopy.push(`${subfolder}/test.txt`);
        }

        this.log(`Spawning ${pathOptions.componentName} Component ...`);
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
        const scriptExtension = this._useTS ? 'tsx' : 'jsx';
        const path = pathOptions.noDefaultFolder
            ? `src/${pathOptions.path}/${pathOptions.componentName}/${pathOptions.componentName}`
            : `src/components/${pathOptions.path}/${pathOptions.componentName}/${pathOptions.componentName}`;

        templatesToCopy.forEach((template) => {
            let fileEnding = scriptExtension;
            if (template.includes('test')) fileEnding = `spec.${scriptExtension}`;
            if (template.includes('styles')) fileEnding = 'module.scss';
            if (template.includes('styleguide')) fileEnding = 'md';

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
}

module.exports = ComponentGenerator;
