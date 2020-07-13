
import { PaginaService } from '../Shared/Pagina';
import { MeusImoveis } from '../MeusIm\u00F3veis/MeusImoveis.po';


export class HomeLogada extends PaginaService {
    IrParaMeusImóveis() {
        this.getElementByXpath('//*[@id="dropdownMenuUser"]/span/i').click();
        this.getElementByXpath('//*[@id="myNavbar"]/ul/li[11]/div/ul/li[11]/a/span').click();
        return new MeusImoveis;
    }
}