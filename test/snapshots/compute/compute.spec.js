import testCompute from './testCompute';

describe('testCompute', () => {

    it('testCompute is a computed with args and value', () => {
        expect(testCompute).toHaveProperty('args');
        expect(testCompute).toHaveProperty('value');
    });
});
