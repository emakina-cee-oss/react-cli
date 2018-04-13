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
     * WRITING
     *
     * @returns {undefined}
     */
    writing() {
        const pathOptions = this._getPathOptions();
        this.log(`Spawning ${pathOptions.componentName} Component ...`);

        const templatesToCopy = [
            'styles.txt',
            'styleguide.md',
        ];

        if (this.options.connect) {
            templatesToCopy.push('component-connected.txt');
            templatesToCopy.push('test-connected.txt');
        } else if (this.options.stateful) {
            templatesToCopy.push('component-stateful.txt');
            templatesToCopy.push('test.txt');
        } else {
            templatesToCopy.push('component.txt');
            templatesToCopy.push('test.txt');
        }

        this._copyFiles(templatesToCopy, pathOptions);
    }

    _getPathOptions() {
        const pathOptions = {};
        const split = this.options.path.split('/');
        let relPath = '../../';

        if (split[0] === '') split.shift();
        if (split[0] === '.') {
            pathOptions.noDefaultFolder = true;
            split.shift();
            relPath = '';
        }

        split.forEach((s, idx) => {
            if ((pathOptions.noDefaultFolder && idx === 0) || idx > 0) {
                relPath += '../';
            }
        });

        pathOptions.componentName = this._getName(split.pop());
        pathOptions.path = split.join('/');
        pathOptions.relativeStylesPath = relPath;

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
            : `src/components/${pathOptions.path}/${pathOptions.componentName}/${pathOptions.componentName}`;

        templatesToCopy.forEach((template) => {
            let fileEnding = 'js';
            if (template.includes('test')) fileEnding = 'spec.js';
            if (template.includes('styles')) fileEnding = 'module.scss';
            if (template.includes('styleguide')) fileEnding = 'md';

            this.fs.copyTpl(
                this.templatePath(template),
                this.destinationPath(`${path}.${fileEnding}`),
                {
                    name: pathOptions.componentName,
                    nameUpperCase: changeCase.upperCase(changeCase.sentenceCase(pathOptions.componentName)),
                    styleEssentialsPath: `${pathOptions.relativeStylesPath}styles/essentials`
                }
            );
        });
    }
}

module.exports = ComponentGenerator;
