const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/module';


describe('Module', () => {

    before(() => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['test']);
    });

    it('generates all files', () => {
        yoAssert.file([
            './src/modules/Test/TestModule.js',
        ]);
    });

    it('module file has valid content', (done) => {
        fs.readFile(path.join(__dirname, './snapshots/module/module.js'), 'utf8', (err, template) => {
            if (err) done(err);
            if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

            yoAssert.fileContent(
                './src/modules/Test/TestModule.js',
                template
            );
            done();
        });
    });
});
