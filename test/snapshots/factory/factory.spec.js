import test from './testFactory';


describe('testFactory', () => {

    it('testFactory is a function returning a function', () => {
        expect(test()).toBeInstanceOf(Function);
    });
});
