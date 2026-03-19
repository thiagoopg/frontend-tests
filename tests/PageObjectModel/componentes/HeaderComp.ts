import { Locator, Page } from "@playwright/test";

export class HeaderComp {
    private readonly page: Page;

    private readonly home: Locator;
    private readonly cadastrarUsuarios: Locator;
    private readonly listarUsuarios: Locator;
    private readonly cadastrarProdutos: Locator;
    private readonly listarProdutos: Locator;
    private readonly relatorios: Locator;
    private readonly logout: Locator;

    constructor(page: Page) {
        this.page = page;

        this.home = page.getByTestId('home');
        this.cadastrarUsuarios = page.getByTestId('cadastrar-usuarios');
        this.listarUsuarios = page.getByTestId('listar-usuarios');
        this.cadastrarProdutos = page.getByTestId('cadastrar-produtos');
        this.listarProdutos = page.getByTestId('listar-produtos');
        this.relatorios = page.getByTestId('link-relatorios');
        this.logout = page.getByTestId('logout');
    }

    async voltarParaHome() {
        await this.home.click();
    }
    async irParaCadastroUsuarios() {
        await this.cadastrarUsuarios.click();
    }
    async irParaListaUsuarios() {
        await this.listarUsuarios.click();
    }
    async irParaCadastroProdutos() {
        await this.cadastrarProdutos.click();
    }
    async irParaListaProdutos() {
        await this.listarProdutos.click();
    }
    async irParaRelatorios() {
        await this.relatorios.click();
    }
    async deslogar() {
        await this.logout.click();
    }
}