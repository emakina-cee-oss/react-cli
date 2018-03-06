const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/action';


describe('Action', () => {

    describe('without module', () => {
        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['test-action']);
        });

        it('generates all files to shared location', () => {
            yoAssert.file([
                './src/shared/actions/testAction.js',
                './src/shared/actions/testAction.spec.js',
            ]);
        });

        it('action file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/action/action.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/shared/actions/testAction.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/action/action.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/shared/actions/testAction.spec.js',
                    template
                );
                done();
            });
        });
    });

    describe('with module', () => {

        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['test-action', 'test-module']);
        });

        it('generates all files to module location', () => {
            yoAssert.file([
                './src/modules/TestModule/actions/testAction.js',
                './src/modules/TestModule/actions/testAction.spec.js',
            ]);
        });

        it('action file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/action/action.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/modules/TestModule/actions/testAction.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/action/action.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/modules/TestModule/actions/testAction.spec.js',
                    template
                );
                done();
            });
        });
    });
});
