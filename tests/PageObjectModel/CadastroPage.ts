import {Page,Locator} from '@playwright/test';
import {CadastrarComp} from "./componentes/CadastrarComp";

export class CadastroPage{
    private readonly page:Page;

    private readonly url:string;

    public readonly cadastro:CadastrarComp;

    private readonly loginButton:Locator;

    constructor(page:Page) {
        this.page = page;

        this.url = 'https://front.serverest.dev/cadastrarusuarios';

        this.cadastro = new CadastrarComp(page);

        this.loginButton = page.getByTestId('entrar');
    }

    async visitarPaginaCadastro(){
        await this.page.goto(this.url,{timeout: 10000});
    }
    async visitarPaginaLogin(){
        await this.loginButton.click();
    }

}