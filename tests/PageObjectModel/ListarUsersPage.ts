import {Page} from "@playwright/test";
import {HeaderComp} from "./componentes/HeaderComp";
import {expect} from "../fixtures/Fixture";


export class ListarUsersPage{
    private readonly page:Page;

    private readonly url:string;

    private readonly header:HeaderComp;
    constructor(page: Page) {
        this.page = page;
        this.url = 'https://front.serverest.dev/admin/listarusuarios';
        this.header = new HeaderComp(page);
    }

    async visitarPaginaListarUsers(){
        await this.page.goto(this.url,{timeout: 10000});
    }

    private async verificarUsuarioExistente(email:string){
        await expect(this.page.locator(`text=${email}`))
            .toHaveCount(1);
    }
    async excluirUsuarioPorEmail(email:string){
        this.verificarUsuarioExistente(email);
        await this.page.locator(`text=${email}`)
            .locator('..')
            .getByRole('button', { name: 'Excluir' })
            .click();
    }

}