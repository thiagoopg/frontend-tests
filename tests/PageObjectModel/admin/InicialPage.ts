import {Locator, Page} from "@playwright/test";
import {HeaderComp} from "../componentes/HeaderComp";


export class InicialPage {
    private readonly page:Page;
    private readonly url:string;

    public readonly header:HeaderComp;

    private readonly cadastrarUsuariosButton:Locator;
    private readonly listarUsuariosButton:Locator;
    private readonly cadastrarProdutosButton:Locator;
    private readonly listarProdutosButton:Locator;
    private readonly relatoriosButton:Locator;
    private readonly logoutButton:Locator;
    constructor(page:Page) {
        this.page = page;
        this.url = "https://front.serverest.dev/admin/home";

        this.header = new HeaderComp(page);

        this.cadastrarUsuariosButton = page.getByTestId('cadastrarUsuarios');
        this.listarUsuariosButton = page.getByTestId('listarUsuarios');
        this.cadastrarProdutosButton = page.getByTestId('cadastrarProdutos');
        this.listarProdutosButton = page.getByTestId('listarProdutos');
        this.relatoriosButton = page.getByTestId('relatorios');
    }
    async visitarPaginaAdminInicial(){
        await this.page.goto(this.url,{timeout: 10000});
    }
    async clicarCadastrarUsuarios(){
        await this.cadastrarUsuariosButton.click();
    }
    async clicarListarUsuarios(){
        await this.listarUsuariosButton.click();
    }
    async clicarCadastrarProdutos(){
        await this.cadastrarProdutosButton.click();
    }
    async clicarListarProdutos(){
        await this.listarProdutosButton.click();
    }
    async clicarRelatorios(){
        await this.relatoriosButton.click();
    }
    async clicarLogout(){
        await this.logoutButton.click();
    }

}