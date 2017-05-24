import MinionsModule from './MinionsModule';

it('Modules exports object with state and signals', () => {
    expect(MinionsModule).toHaveProperty('state');
    expect(MinionsModule).toHaveProperty('signals');
});
