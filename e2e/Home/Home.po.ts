import { browser, by, element } from 'protractor';
import { PaginaService } from '../Shared/Pagina';
import { Login } from '../Login/Login.po';


export class Home extends PaginaService {

  irParaLogin() {
    var elemento = this.getElementById('icoLogin').click();
    return new Login;
  }

  navegarParaHome() {
    return this.navigateTo('http://localhost:4200/');
    // return this.navigateTo('http://clickealugue.dev.marlin.net/');
  }
}
