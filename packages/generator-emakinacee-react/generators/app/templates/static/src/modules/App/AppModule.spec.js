import AppModule from './AppModule';

it('Modules exports object with state and signals', () => {
    expect(AppModule).toHaveProperty('state');
    expect(AppModule).toHaveProperty('signals');
});
