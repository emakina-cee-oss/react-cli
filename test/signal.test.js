const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/signal';


describe('Signal', () => {

    it('generates all files to shared location', () => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['test-signal'])
            .then(() => {
                yoAssert.file([
                    './src/shared/signals/testSignal.js',
                    './src/shared/signals/testSignal.spec.js',
                ]);
            });
    });

    it('generates all files to module location', () => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['test-signal', 'test-module'])
            .then(() => {
                yoAssert.file([
                    './src/modules/TestModule/signals/testSignal.js',
                    './src/modules/TestModule/signals/testSignal.spec.js',
                ]);
            });
    });

    it('file has valid content', (done) => {
        fs.readFile(path.join(__dirname, './snapshots/signal.js'), 'utf8', (err, template) => {
            if (err) done(err);

            yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['test-signal'])
                .then(() => {
                    yoAssert.fileContent(
                        './src/shared/signals/testSignal.js',
                        template
                    );
                    done();
                })
                .catch((error) => done(error));
        });
    });
});
