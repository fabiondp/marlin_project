import { browser, by, element } from 'protractor';
import { PaginaService } from '../Shared/Pagina';
import { Login } from '../Login/Login.po';
import { MeusAnuncios } from '../MeusAnuncios/MeusAnuncios.po';



export class Dashboard extends PaginaService {
    irParaMeusAnuncios() {
        this.getElementByXpath('//*[@id="dropdownMenuUser"]/span/i').click();
        this.getElementByXpath('//*[@id="myNavbar"]/ul/li[11]/div/ul/li[9]/a').click();
        return new MeusAnuncios;
    }
    fecharTutorial() {
        this.getElementByXpath('/html/body/joyride-step/div/div/joy-close-button').click();
        return this;
    }
}
