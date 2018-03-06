const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/signal';


describe('Signal', () => {

    describe('without module', () => {
        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['test-signal']);
        });

        it('generates all files to shared location', () => {
            yoAssert.file([
                './src/shared/signals/testSignal.js',
                './src/shared/signals/testSignal.spec.js',
            ]);
        });

        it('signal file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/signal/signal.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/shared/signals/testSignal.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/signal/signal.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/shared/signals/testSignal.spec.js',
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
                .withArguments(['test-signal', 'test-module']);
        });

        it('generates all files to module location', () => {
            yoAssert.file([
                './src/modules/TestModule/signals/testSignal.js',
                './src/modules/TestModule/signals/testSignal.spec.js',
            ]);
        });

        it('signal file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/signal/signal.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/modules/TestModule/signals/testSignal.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/signal/signal.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/modules/TestModule/signals/testSignal.spec.js',
                    template
                );
                done();
            });
        });
    });
});
