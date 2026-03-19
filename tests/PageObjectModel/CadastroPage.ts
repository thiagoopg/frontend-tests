import {Page,Locator} from '@playwright/test';
import {CadastroComp} from "./componentes/cadastroComp";

export class CadastroPage{
    private readonly page:Page;

    private readonly url:string;

    public readonly cadastro: CadastroComp;

    private readonly loginButton:Locator;

    constructor(page:Page) {
        this.page = page;

        this.url = 'https://front.serverest.dev/cadastrarusuarios';

        this.cadastro = new CadastroComp(page);

        this.loginButton = page.getByTestId('entrar');
    }

    async visitarPaginaCadastro(){
        await this.page.goto(this.url);
    }
    async visitarPaginaLogin(){
        await this.loginButton.click();
    }


}