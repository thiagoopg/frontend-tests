import { Locator, Page } from "@playwright/test";

export class CadastroComp {
    private readonly page:Page;

    private readonly alert:Locator;
    private readonly nome:Locator;
    private readonly email:Locator;
    private readonly password:Locator;
    private readonly adminCheckbox:Locator;
    public cadastrarButton:Locator;

    constructor(page: Page) {
        this.alert = page.locator('.alert');
        this.nome = page.getByTestId('nome');
        this.email = page.getByTestId('email');
        this.password = page.getByTestId('password');
        this.adminCheckbox = page.getByTestId('checkbox');
        this.cadastrarButton = page.getByTestId('cadastrar');
    }
    async getAlert():Promise<Locator>{
        return this.alert;
    }
    async cadastrarUsuario(user: {
        nome: string;
        email: string;
        password: string;
        admin: boolean;
    }) {
        await this.nome.fill(user.nome);
        await this.email.fill(user.email);
        await this.password.fill(user.password);
        if(user.admin) {
            await this.adminCheckbox.check();
        }
        await this.cadastrarButton.click();
    }
    async cadastrarUsers(usuarios: {
        nome: string;
        email: string;
        password: string;
        admin: boolean;
    }[]) {
        for (const user of usuarios) {
            await this.cadastrarUsuario(user);
        }
    }
}