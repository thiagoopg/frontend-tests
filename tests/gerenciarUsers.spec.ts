import { test, expect } from './fixtures/Fixture';
import {UserFactory} from "./factory/UserFactory";

test.describe('gerenciar usuários - exclusão', () => {
    const admin = UserFactory.build({ admin: true });
    test.beforeEach(async ({ cadastroPage, page }) => {
        // cria um admin e loga
        await cadastroPage.visitarPaginaCadastro();
        await cadastroPage.cadastro.cadastrarUsuario(admin);
        await expect(await cadastroPage.cadastro.getAlert()).toContainText('Cadastro realizado com sucesso');
        await expect(page).toHaveURL('https://front.serverest.dev/admin/home', {timeout: 10000});
    });


    //Exemplo de código de como seria sem o BeforeEach para criar o admin.
    test('como administrador, excluo um usuário normal com sucesso', async ({ cadastrarUsersPage, listarUsersPage ,page }) => {

        await cadastrarUsersPage.visitarPaginaCadastrarUsers();
        const userParaExcluir = UserFactory.build({ admin: false });

        //Cadastro eles
        await cadastrarUsersPage.cadastro.cadastrarUsuario(userParaExcluir);

        //Faço a verificação do teste
        //Faço a verificação do teste
        await listarUsersPage.visitarPaginaListarUsers();
        await listarUsersPage.excluirUsuarioPorEmail(userParaExcluir.email);
        await expect(page.locator(`text=${userParaExcluir.email}`))
            .toHaveCount(0);
    });

    test('como administrador, não consigo excluir outro administrador', async ({ cadastrarUsersPage, listarUsersPage, page }) => {

        //Crio os usuários para o teste
        await cadastrarUsersPage.visitarPaginaCadastrarUsers();
        const userParaExcluir = UserFactory.build({ admin: true });

        //Cadastro ele
        await cadastrarUsersPage.cadastro.cadastrarUsuario(userParaExcluir);

        //Faço a verificação do teste
        await listarUsersPage.visitarPaginaListarUsers();
        await listarUsersPage.excluirUsuarioPorEmail(userParaExcluir.email);
        await expect(page.locator(`text=${userParaExcluir.email}`))
            .toHaveCount(1);
    });

    test('como administrador, não consigo excluir meu próprio usuário', async ({ page }) => {

        await page.goto('https://front.serverest.dev/admin/listarusuarios');

        await page.locator(`text=${admin.email}`)
            .locator('..')
            .getByRole('button', { name: 'Excluir' })
            .click();

        // continua na lista
        await expect(page.locator(`text=${admin.email}`))
            .toBeVisible();
    });

});