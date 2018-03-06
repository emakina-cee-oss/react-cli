const path = require('path');
const yoHelper = require('yeoman-test');
const expect = require('chai').expect;
// const yoAssert = require('yeoman-assert');

const generatorName = 'emakinacee-react:gen';
const generatorPath = '../packages/generator-emakinacee-react/generators/gen';

describe('Gen', () => {

    it('arguments are set properly', () => {
        const type = 'signal';
        const name = 'foo';
        const module = 'bar';
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name, module ], {});

        const typeArg = generator._arguments.filter((arg) => arg.name === 'type')[0];
        const nameArg = generator._arguments.filter((arg) => arg.name === 'name')[0];
        const moduleArg = generator._arguments.filter((arg) => arg.name === 'module')[0];

        expect(typeArg.required).to.be.equal(true);
        expect(generator.options.type).to.be.equal(type);
        expect(nameArg.required).to.be.equal(true);
        expect(generator.options.name).to.be.equal(name);
        expect(moduleArg.required).to.be.equal(false);
        expect(generator.options.module).to.be.equal(module);
    });

    it('options are set properly', () => {
        const type = 'signal';
        const name = 'foo';
        const module = 'bar';
        const options = {
            connect: true,
            stateful: true,
        };
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name, module ], options);

        expect(generator._options).to.have.property('connect');
        expect(generator.options.connect).to.be.equal(true);
        expect(generator._options).to.have.property('stateful');
        expect(generator.options.stateful).to.be.equal(true);
    });

    it('type "component" is not a nestable', () => {
        const type = 'component';
        const name = 'foo';
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], {});
        const isNestableType = generator._isNestableType();

        expect(isNestableType).to.be.equal(false);
    });

    it('type "container" is not a nestable', () => {
        const type = 'container';
        const name = 'foo';
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], {});
        const isNestableType = generator._isNestableType();

        expect(isNestableType).to.be.equal(false);
    });

    it('type "module" is not a nestable', () => {
        const type = 'module';
        const name = 'foo';
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], {});
        const isNestableType = generator._isNestableType();

        expect(isNestableType).to.be.equal(false);
    });

    it('type "action" is nestable', () => {
        const type = 'action';
        const name = 'foo';
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], {});
        const isNestableType = generator._isNestableType();

        expect(isNestableType).to.be.equal(true);
    });

    it('type "factory" is nestable', () => {
        const type = 'factory';
        const name = 'foo';
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], {});
        const isNestableType = generator._isNestableType();

        expect(isNestableType).to.be.equal(true);
    });

    it('type "compute" is nestable', () => {
        const type = 'compute';
        const name = 'foo';
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], {});
        const isNestableType = generator._isNestableType();

        expect(isNestableType).to.be.equal(true);
    });

    it('type "signal" is nestable', () => {
        const type = 'signal';
        const name = 'foo';
        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], {});
        const isNestableType = generator._isNestableType();

        expect(isNestableType).to.be.equal(true);
    });

    it('composes with "component" properly', () => {
        const type = 'component';
        const name = 'foo';
        const options = {
            stateful: true,
        };

        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], options);
        generator.initializing();
        generator.default();

        const subGenerator = generator._composedWith.filter((g) => g.options.namespace === 'emakinacee-react:component')[0];

        expect(subGenerator).not.to.be.undefined;
        expect(subGenerator.options.stateful).to.be.equals(true);
        expect(subGenerator.arguments).to.have.ordered.members([name]);
    });

    it('composes with "container" properly', () => {
        const type = 'container';
        const name = 'foo';
        const options = {
            stateful: true,
        };

        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], options);
        generator.initializing();
        generator.default();

        const subGenerator = generator._composedWith.filter((g) => g.options.namespace === 'emakinacee-react:container')[0];

        expect(subGenerator).not.to.be.undefined;
        expect(subGenerator.options.stateful).to.be.equals(true);
        expect(subGenerator.arguments).to.have.ordered.members([name]);
    });

    it('composes with "signal" properly', () => {
        const type = 'signal';
        const name = 'foo';
        const module = 'bar';

        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name, module ], {});
        generator.initializing();
        generator.default();

        const componentGenerator = generator._composedWith.filter((g) => g.options.namespace === 'emakinacee-react:signal')[0];

        expect(componentGenerator).not.to.be.undefined;
        expect(componentGenerator.arguments).to.have.ordered.members([name, module]);
    });

    it('composes with "action" properly', () => {
        const type = 'action';
        const name = 'foo';
        const module = 'bar';

        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name, module ], {});
        generator.initializing();
        generator.default();

        const componentGenerator = generator._composedWith.filter((g) => g.options.namespace === 'emakinacee-react:action')[0];

        expect(componentGenerator).not.to.be.undefined;
        expect(componentGenerator.arguments).to.have.ordered.members([name, module]);
    });

    it('composes with "factory" properly', () => {
        const type = 'factory';
        const name = 'foo';
        const module = 'bar';

        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name, module ], {});
        generator.initializing();
        generator.default();

        const componentGenerator = generator._composedWith.filter((g) => g.options.namespace === 'emakinacee-react:factory')[0];

        expect(componentGenerator).not.to.be.undefined;
        expect(componentGenerator.arguments).to.have.ordered.members([name, module]);
    });

    it('composes with "compute" properly', () => {
        const type = 'compute';
        const name = 'foo';
        const module = 'bar';

        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name, module ], {});
        generator.initializing();
        generator.default();

        const componentGenerator = generator._composedWith.filter((g) => g.options.namespace === 'emakinacee-react:compute')[0];

        expect(componentGenerator).not.to.be.undefined;
        expect(componentGenerator.arguments).to.have.ordered.members([name, module]);
    });

    it('composes with "module" properly', () => {
        const type = 'module';
        const name = 'foo';

        const generator = yoHelper.createGenerator(generatorName, [path.join(__dirname, generatorPath)], [ type, name ], {});
        generator.initializing();
        generator.default();

        const componentGenerator = generator._composedWith.filter((g) => g.options.namespace === 'emakinacee-react:module')[0];

        expect(componentGenerator).not.to.be.undefined;
        expect(componentGenerator.arguments).to.have.ordered.members([name]);
    });
});
