import {Locator, Page} from "@playwright/test";
import {HeaderComp} from "../componentes/HeaderComp";
import {CadastroComp} from "../componentes/CadastroComp";


export class CadastrarUsersPage {
    private readonly page:Page;

    private readonly url:string;

    public readonly header:HeaderComp;
    public readonly cadastro:CadastroComp;

    constructor(page:Page) {
        this.page = page;

        this.url = 'https://front.serverest.dev/admin/cadastrarusuarios';

        this.header = new HeaderComp(page);
        this.cadastro = new CadastroComp(page);
        this.cadastro.cadastrarButton = page.getByTestId("cadastrarUsuario");
    }
    visitarPaginaCadastrarUsers(){
        this.page.goto(this.url);
    }
}