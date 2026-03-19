export class UserFactory {

    static build(overrides = {}) {
        const timestamp = new Date().getMilliseconds();
        return {
            nome: 'User Teste',
            email: 'user_' + timestamp + '@test.com',
            password: 'teste123',
            admin: false,
            ...overrides
        };
    }
}