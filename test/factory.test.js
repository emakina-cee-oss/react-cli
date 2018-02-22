const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/factory';


describe('Factory', () => {

    describe('without module', () => {
        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['test-factory']);
        });

        it('generates all files to shared location', () => {
            yoAssert.file([
                './src/shared/factories/testFactory.js',
                './src/shared/factories/testFactory.spec.js',
            ]);
        });

        it('factory file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/factory/factory.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/shared/factories/testFactory.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/factory/factory.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/shared/factories/testFactory.spec.js',
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
                .withArguments(['test-factory', 'test-module']);
        });

        it('generates all files to module location', () => {
            yoAssert.file([
                './src/modules/TestModule/factories/testFactory.js',
                './src/modules/TestModule/factories/testFactory.spec.js',
            ]);
        });

        it('factory file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/factory/factory.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/modules/TestModule/factories/testFactory.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/factory/factory.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/modules/TestModule/factories/testFactory.spec.js',
                    template
                );
                done();
            });
        });
    });
});
