import {Locator, Page} from '@playwright/test'

export class LoginPage {
    private readonly page :Page;
    private readonly url :string;
    private readonly alert :Locator;
    private readonly email :Locator;
    private readonly password :Locator;
    private readonly loginButton :Locator;
    private readonly cadastrarButton :Locator;

    constructor(page :Page) {
        this.page = page;
        this.url = 'https://front.serverest.dev/login';
        this.alert = page.locator('.alert');
        this.email = page.getByTestId('email');
        this.password = page.getByTestId('senha');
        this.loginButton = page.getByTestId('entrar');
        this.cadastrarButton = page.getByTestId('cadastrar');
    }
    async visitarPaginaLogin(){
        await this.page.goto(this.url,{timeout: 10000});
    }
    async visitarPaginaCadastroPeloLogin(){
        await this.cadastrarButton.click();
    }
    async logarUsuario(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async getAlert():Promise<Locator>{
        return this.alert;
    }

}