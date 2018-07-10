const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/container';


describe('Container', () => {

    describe('Stateless', () => {
        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['foo']);
        });

        it('generates all files', () => {
            yoAssert.file([
                './src/containers/Foo/Foo.jsx',
                './src/containers/Foo/Foo.spec.jsx',
            ]);
        });

        it('container file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/container/container.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/containers/Foo/Foo.jsx',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/container/container.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/containers/Foo/Foo.spec.jsx',
                    template
                );
                done();
            });
        });
    });

    describe('Stateless - Connected', () => {
        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['foo'])
                .withOptions({ connect: true });
        });

        it('generates all files', () => {
            yoAssert.file([
                './src/containers/Foo/Foo.jsx',
                './src/containers/Foo/Foo.spec.jsx',
            ]);
        });

        it('container file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/container/container-connected.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/containers/Foo/Foo.jsx',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/container/container-connected.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/containers/Foo/Foo.spec.jsx',
                    template
                );
                done();
            });
        });
    });

    describe('Stateful', () => {
        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['foo'])
                .withOptions({ stateful: true });
        });

        it('generates all files', () => {
            yoAssert.file([
                './src/containers/Foo/Foo.jsx',
                './src/containers/Foo/Foo.spec.jsx',
            ]);
        });

        it('container file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/container/container-stateful.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/containers/Foo/Foo.jsx',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/container/container.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/containers/Foo/Foo.spec.jsx',
                    template
                );
                done();
            });
        });
    });


    it('generates files relative to containers folder', () => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['sub/foo'])
            .then(() => {
                yoAssert.file([
                    './src/containers/sub/Foo/Foo.jsx',
                    './src/containers/sub/Foo/Foo.spec.jsx',
                ]);
            });
    });

    it('generates files relative to src folder', () => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['./someWhereOverTheRainbow/foo'])
            .then(() => {
                yoAssert.file([
                    './src/someWhereOverTheRainbow/Foo/Foo.jsx',
                    './src/someWhereOverTheRainbow/Foo/Foo.spec.jsx',
                ]);
            });
    });
});
