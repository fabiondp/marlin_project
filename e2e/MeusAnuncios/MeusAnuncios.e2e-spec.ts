import { element } from 'protractor';
import { InfoWindowManager } from '@agm/core';
import { Home } from '../Home/Home.po';
import { HomeLogada } from '../HomeLogada/HomeLogada.po';
import { Login } from '../Login/Login.po';
import { Dashboard } from '../Dashboard/Dashboard.po';
import { MeusAnuncios } from './MeusAnuncios.po';



describe('Página Meus imóveis', () => {
    let page: Home;
    let paginaLogin: Login;
    let homeLogada: HomeLogada;
    let meusAnuncios: MeusAnuncios;
    let dashboard: Dashboard;

    beforeEach(() => {
        page = new Home();
        page.navegarParaHome();
        paginaLogin = page.irParaLogin();
        dashboard = paginaLogin.realizarLogin();
        //dashboard.fecharTutorial();
        meusAnuncios = dashboard.irParaMeusAnuncios();
    });

    it('Verificar titulo da janela', () => {
        expect(meusAnuncios.getTitle()).toEqual('Click Alugue');
    });

    it('Verificar Titulo da página', () => {
        var textoObtido = meusAnuncios.getElementByXpath(meusAnuncios.tituloDaPagina);
        console.log('mensagem obtida ' + textoObtido.getText());
        expect(meusAnuncios.getElementByXpath(meusAnuncios.tituloDaPagina).getText())
            .toContain('Meus Imóveis');
    });

    // it('Realizar Login', () => {
    //     let homeLogada = paginaLogin.realizarLogin();
    //     expect(homeLogada).not.toBeNull();
    // });

});