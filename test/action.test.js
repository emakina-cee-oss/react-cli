const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/action';


describe('Action', () => {

    it('generates all files to shared location', () => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['test-action'])
            .then(() => {
                yoAssert.file([
                    './src/shared/actions/testAction.js',
                    './src/shared/actions/testAction.spec.js',
                ]);
            });
    });

    it('generates all files to module location', () => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['test-action', 'test-module'])
            .then(() => {
                yoAssert.file([
                    './src/modules/TestModule/actions/testAction.js',
                    './src/modules/TestModule/actions/testAction.spec.js',
                ]);
            });
    });

    it('file has valid content', (done) => {
        fs.readFile(path.join(__dirname, './snapshots/action.js'), 'utf8', (err, template) => {
            if (err) done(err);

            yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['test-action'])
                .then(() => {
                    yoAssert.fileContent(
                        './src/shared/actions/testAction.js',
                        template
                    );
                    done();
                })
                .catch((error) => done(error));
        });
    });
});
