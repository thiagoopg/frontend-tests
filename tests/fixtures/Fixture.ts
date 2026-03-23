import { test as base } from '@playwright/test';
import {LoginPage} from "../PageObjectModel/loginPage";
import {CadastroPage} from "../PageObjectModel/cadastroPage";
import {InicialPage} from "../PageObjectModel/admin/InicialPage";
import {CadastrarUsersPage} from "../PageObjectModel/admin/CadastrarUsersPage";
import {ListarUsersPage} from "../PageObjectModel/ListarUsersPage";

type MyFixture =
{
    cadastroPage: CadastroPage;
    loginPage: LoginPage;
    inicialPage: InicialPage;
    cadastrarUsersPage:CadastrarUsersPage;
    listarUsersPage:ListarUsersPage;
}

export const test = base.extend<MyFixture>({
    cadastroPage: async ({page}, use) => {
        const cadastroPage = new CadastroPage(page);
        await use(cadastroPage);
    },
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    inicialPage: async ({page}, use) => {
        const loginPage = new InicialPage(page);
        await use(loginPage);
    },
    cadastrarUsersPage: async ({page}, use) => {
        const loginPage = new CadastrarUsersPage(page);
        await use(loginPage);
    },
    listarUsersPage: async ({page}, use) => {
        const loginPage = new ListarUsersPage(page);
        await use(loginPage);
    }
})

export { expect } from '@playwright/test';
