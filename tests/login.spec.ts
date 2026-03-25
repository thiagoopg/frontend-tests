import {test, expect} from './fixtures/fixture';
import {UserFactory} from "./factory/userFactory";

test.describe('criar usuários com sucesso', () => {
    test.beforeEach(async ({cadastroPage}) => {
        await cadastroPage.visitarPaginaCadastro()
    })
    test('como um visitante, crio um usuário administrador com sucesso', async ({cadastroPage, page}) => {
        await cadastroPage.cadastro.cadastrarUsuario(UserFactory.build({admin: true}))
        await expect(page).toHaveURL('https://front.serverest.dev/admin/home', {timeout: 20000})
    })
    test('como um visitante, crio um usuário normal com sucesso', async ({cadastroPage, page}) => {
        await cadastroPage.cadastro.cadastrarUsuario(UserFactory.build({admin: false}))
        await expect(page).toHaveURL('https://front.serverest.dev/home', {timeout: 20000})
    })
})
test.describe('testar falhas ao criar usuários', () => {
    test('como um visitante, crio um usuário com email repetido', async ({listarUsersPage ,cadastroPage, loginPage, page}) => {

        const user = UserFactory.build({admin: false})

        await cadastroPage.visitarPaginaCadastro()
        await cadastroPage.cadastro.cadastrarUsuario(user)
        await expect(page).toHaveURL('https://front.serverest.dev/home', {timeout: 20000})

        await cadastroPage.visitarPaginaCadastro()
        await cadastroPage.cadastro.cadastrarUsuario(user)
        await expect(page).toHaveURL('https://front.serverest.dev/cadastrarusuarios')
        await expect(await cadastroPage.cadastro.getAlert()).toContainText('Este email já está sendo usado');

    })
})