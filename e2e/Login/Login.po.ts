import { PaginaService } from "../Shared/Pagina";
import { HomeLogada } from "../HomeLogada/HomeLogada.po";
import { Dashboard } from "../Dashboard/Dashboard.po";


export class Login extends PaginaService {


    tituloDaPagina = '/html/body/app-root/div/app-login/div/section/div[1]/h1';

    realizarLogin() {
        this.getElementById('username').sendKeys('jribeiro@marlin.com.br');
        this.getElementById('password').sendKeys('12345677');
        this.getElementById('continuar').click();
        return new Dashboard;
    }

}