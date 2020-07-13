import { PaginaService } from "../Shared/Pagina";
import { MeusAnuncios } from "../MeusAnuncios/MeusAnuncios.po";


export class CriarAnuncio extends PaginaService {
    publicarAnuncio(): any {
        this.getElementByXpath('/html/body/app-root/div/app-salvar-anuncio/div/section/div/form/div[3]/div/button[2]').click();
        return new MeusAnuncios;
    }
    tituloDaPagina: '/html/body/app-root/div/app-salvar-anuncio/div/section/div/h1';
    btnBuscaCep: 'btnBuscarCep';
}