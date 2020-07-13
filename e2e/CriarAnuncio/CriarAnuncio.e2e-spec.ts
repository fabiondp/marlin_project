import { Home } from "../Home/Home.po";
import { Login } from "../Login/Login.po";
import { Dashboard } from "../Dashboard/Dashboard.po";
import { MeusAnuncios } from "../MeusAnuncios/MeusAnuncios.po";
import { CriarAnuncio } from "./CriarAnuncio.po";

describe('Página Criar Anuncio', () => {
    let page: Home;
    let paginaLogin: Login;
    let dashboard: Dashboard;
    let meusAnuncios: MeusAnuncios;
    let criarAnuncio: CriarAnuncio;

    beforeEach(() => {
        page = new Home();
        page.navegarParaHome();
        paginaLogin = page.irParaLogin();
        dashboard = paginaLogin.realizarLogin();
        dashboard.wait();
        meusAnuncios = dashboard.irParaMeusAnuncios();
        criarAnuncio = meusAnuncios.irParaCriarAnuncios();
        //criarAnuncio.setAttribute();
        criarAnuncio.getElementByXpath('//*[@id="Plano"]').click();
        criarAnuncio.getElementByXpath('//*[@id="Plano"]/option[2]').click();
        criarAnuncio.wait();
        criarAnuncio.getElementById('Continuar').click();
        criarAnuncio.getElementByXpath('//*[@id="TipoImovel"]/option[2]').click();
        criarAnuncio.getElementById('Descricao').sendKeys('Teste Automatizado');
        //console.log('passou descricao');
        criarAnuncio.getElementById('txtCepParaBusca').sendKeys('20031140');
        //console.log('passou digitar cep');
        criarAnuncio.wait();
        criarAnuncio.getElementById(criarAnuncio.btnBuscaCep).click();
        criarAnuncio.wait();
        //console.log('passou buscar cep');
        criarAnuncio.wait();
        criarAnuncio.getElementById('Numero').sendKeys('3');
        criarAnuncio.wait();
        //console.log('passou numero');
        criarAnuncio.getElementById('TelefoneFixo').sendKeys('1234567891');
        criarAnuncio.getElementById('AreaConstruida ').sendKeys('150');
        criarAnuncio.getElementById('ValorLocacao').clear();
        criarAnuncio.getElementById('ValorLocacao').sendKeys('200000');
        meusAnuncios = criarAnuncio.publicarAnuncio();


    });

    it('Verificar titulo da janela', () => {
        expect(criarAnuncio.getTitle()).toEqual('Click Alugue');
    });

    it('Verificar titulo da pagina', () => {
        expect(criarAnuncio.getElementByXpath(criarAnuncio.tituloDaPagina).getText())
            .toContain('Criar anúncio');
    });

    it('Criar Anuncio', () => {

        //dashboard.fecharTutorial();


        expect(meusAnuncios.getElementByXpath('/html/body/app-root/div/app-anuncios/div/section/div/div/div[1]/div/app-alert/div').getText()).toEqual('Anúncio salvo com sucesso');
    });

});