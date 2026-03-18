import {Page,Locator} from '@playwright/test';

export class CadastroPage{
    private readonly page:Page;
    private readonly url:string;
    private readonly alert:Locator;
    private readonly nome:Locator;
    private readonly email:Locator;
    private readonly password:Locator;
    private readonly adminCheckbox:Locator;
    private readonly cadastrarButton:Locator;
    private readonly loginButton:Locator;

    constructor(page:Page) {
        this.page = page;
        this.url = 'https://front.serverest.dev/cadastrarusuarios';
        this.alert = page.locator('.alert');
        this.nome = page.getByTestId('nome');
        this.email = page.getByTestId('email');
        this.password = page.getByTestId('password');
        this.adminCheckbox = page.getByTestId('checkbox');
        this.cadastrarButton = page.getByTestId('cadastrar');
        this.loginButton = page.getByTestId('entrar');
    }

    async visitarPaginaCadastro(){
        await this.page.goto(this.url);
    }
    async visitarPaginaLogin(){
        await this.loginButton.click();
    }
    async getAlert():Promise<Locator>{
        return this.alert;
    }
    async cadastrarUsuario(nome:string, email:string, password:string, admin:boolean) {
        await this.nome.fill(nome);
        await this.email.fill(email);
        await this.password.fill(password);
        if(admin) {
            await this.adminCheckbox.check();
        }
        await this.cadastrarButton.click();
    }

}