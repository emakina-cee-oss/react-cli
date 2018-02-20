const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');


describe('Signal', () => {

    it('generates all files', () => {
        return yoHelper
            .run(path.join(__dirname))
            .withArguments(['test-signal'])
            .then(() => {
                yoAssert.file([
                    './src/shared/signals/testSignal.js',
                    './src/shared/signals/testSignal.spec.js',
                ]);
            });
    });

    it('generates all files for a given module', () => {
        return yoHelper
            .run(path.join(__dirname))
            .withArguments(['test signal', 'test-module'])
            .then(() => {
                yoAssert.file([
                    './src/modules/TestModule/signals/testSignal.js',
                    './src/modules/TestModule/signals/testSignal.spec.js',
                ]);
            });
    });
});
