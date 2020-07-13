
import { PaginaService } from '../Shared/Pagina';
import { CriarAnuncio } from '../CriarAnuncio/CriarAnuncio.po';


export class MeusAnuncios extends PaginaService {

    tituloDaPagina: '/html/body/app-root/div/app-anuncios/div/section/h1';

    irParaCriarAnuncios() {
        this.getElementByXpath('//*[@id="tour-step-2"]/div/button/i').click();
        return new CriarAnuncio;
    }

}
