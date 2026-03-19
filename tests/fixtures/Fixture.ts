import { test as base } from '@playwright/test';
import {LoginPage} from "../PageObjectModel/loginPage";
import {CadastroPage} from "../PageObjectModel/cadastroPage";

type MyFixture =
{
    cadastroPage: CadastroPage;
    loginPage: LoginPage;
}

export const test = base.extend<MyFixture>({
    cadastroPage: async ({page}, use) => {
        const cadastroPage = new CadastroPage(page);
        await cadastroPage.visitarPaginaCadastro();
        await use(cadastroPage);
    },
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitarPaginaLogin();
        await use(loginPage);
    }
})

export { expect } from '@playwright/test';
