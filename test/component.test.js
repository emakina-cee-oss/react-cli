const fs = require('fs');
const path = require('path');
const yoHelper = require('yeoman-test');
const yoAssert = require('yeoman-assert');

const generatorPath = '../packages/generator-emakinacee-react/generators/component';


describe('Component', () => {

    describe('Stateless', () => {
        before(() => {
            return yoHelper
                .run(path.join(__dirname, generatorPath))
                .withArguments(['foo']);
        });

        it('generates all files', () => {
            yoAssert.file([
                './src/components/Foo/Foo.js',
                './src/components/Foo/Foo.spec.js',
                './src/components/Foo/Foo.md',
                './src/components/Foo/Foo.module.scss',
            ]);
        });

        it('component file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.spec.js',
                    template
                );
                done();
            });
        });

        it('definition file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.md'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.md',
                    template
                );
                done();
            });
        });

        it('style file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.module.scss'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.module.scss',
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
                './src/components/Foo/Foo.js',
                './src/components/Foo/Foo.spec.js',
                './src/components/Foo/Foo.md',
                './src/components/Foo/Foo.module.scss',
            ]);
        });

        it('component file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component-connected.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component-connected.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.spec.js',
                    template
                );
                done();
            });
        });

        it('definition file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.md'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.md',
                    template
                );
                done();
            });
        });

        it('style file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.module.scss'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.module.scss',
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
                './src/components/Foo/Foo.js',
                './src/components/Foo/Foo.spec.js',
                './src/components/Foo/Foo.md',
                './src/components/Foo/Foo.module.scss',
            ]);
        });

        it('component file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component-stateful.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.js',
                    template
                );
                done();
            });
        });

        it('spec file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.spec.js'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.spec.js',
                    template
                );
                done();
            });
        });

        it('definition file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.md'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.md',
                    template
                );
                done();
            });
        });

        it('style file has valid content', (done) => {
            fs.readFile(path.join(__dirname, './snapshots/component/component.module.scss'), 'utf8', (err, template) => {
                if (err) done(err);
                if (!template || template === '') done(new Error('Template snapshot does not exist or is empty'));

                yoAssert.fileContent(
                    './src/components/Foo/Foo.module.scss',
                    template
                );
                done();
            });
        });
    });


    it('generates files relative to components folder', () => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['sub/foo'])
            .then(() => {
                yoAssert.file([
                    './src/components/sub/Foo/Foo.js',
                    './src/components/sub/Foo/Foo.spec.js',
                    './src/components/sub/Foo/Foo.md',
                    './src/components/sub/Foo/Foo.module.scss',
                ]);
            });
    });

    it('generates files relative to src folder', () => {
        return yoHelper
            .run(path.join(__dirname, generatorPath))
            .withArguments(['./someWhereOverTheRainbow/foo'])
            .then(() => {
                yoAssert.file([
                    './src/someWhereOverTheRainbow/Foo/Foo.js',
                    './src/someWhereOverTheRainbow/Foo/Foo.spec.js',
                    './src/someWhereOverTheRainbow/Foo/Foo.md',
                    './src/someWhereOverTheRainbow/Foo/Foo.module.scss',
                ]);
            });
    });
});
