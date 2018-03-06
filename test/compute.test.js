const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/compute';


describe('Compute', () => {

    describe('without module', () => {
        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['test-compute']);
        });

        it('generates all files to shared location', () => {
            yoAssert.file([
                './src/shared/computes/testCompute.js',
                './src/shared/computes/testCompute.spec.js',
            ]);
        });

        it('compute file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/compute/compute.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/shared/computes/testCompute.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/compute/compute.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/shared/computes/testCompute.spec.js',
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
                .withArguments(['test-compute', 'test-module']);
        });

        it('generates all files to module location', () => {
            yoAssert.file([
                './src/modules/TestModule/computes/testCompute.js',
                './src/modules/TestModule/computes/testCompute.spec.js',
            ]);
        });

        it('compute file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/compute/compute.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/modules/TestModule/computes/testCompute.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/compute/compute.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/modules/TestModule/computes/testCompute.spec.js',
                    template
                );
                done();
            });
        });
    });
});
