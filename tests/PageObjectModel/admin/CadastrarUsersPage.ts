import {Page} from "@playwright/test";
import {HeaderComp} from "../componentes/HeaderComp";
import {CadastrarComp} from "../componentes/CadastrarComp";


export class CadastrarUsersPage {
    private readonly page:Page;

    private readonly url:string;

    public readonly header:HeaderComp;
    public readonly cadastro:CadastrarComp;

    constructor(page:Page) {
        this.page = page;

        this.url = 'https://front.serverest.dev/admin/cadastrarusuarios';

        this.header = new HeaderComp(page);
        this.cadastro = new CadastrarComp(page);
        this.cadastro.cadastrarButton = page.getByTestId("cadastrarUsuario");
    }
    visitarPaginaCadastrarUsers(){
        this.page.goto(this.url);
    }
}