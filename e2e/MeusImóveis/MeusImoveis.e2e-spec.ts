import { element } from 'protractor';
import { InfoWindowManager } from '@agm/core';
import { Home } from '../Home/Home.po';
import { HomeLogada } from '../HomeLogada/HomeLogada.po';
import { Login } from '../Login/Login.po';
import { MeusImoveis } from './MeusImoveis.po';
import { Dashboard } from '../Dashboard/Dashboard.po';



describe('Página Meus imóveis', () => {
    let page: Home;
    let paginaLogin: Login;
    let homeLogada: HomeLogada;
    let meusImoveis: MeusImoveis;
    let dashboard: Dashboard;

    beforeEach(() => {
        page = new Home();
        page.navegarParaHome();
        paginaLogin = page.irParaLogin();
        dashboard = paginaLogin.realizarLogin();
        dashboard.fecharTutorial();
        meusImoveis = dashboard.irParaMeusImoveis();
    });

    it('Verificar titulo da janela', () => {
        expect(meusImoveis.getTitle()).toEqual('Click Alugue');
    });

    it('Verificar Titulo da página', () => {
        expect(meusImoveis.getElementByXpath(meusImoveis.tituloDaPagina).getText())
            .toContain('Meus Imóveis');
    });

    // it('Realizar Login', () => {
    //     let homeLogada = paginaLogin.realizarLogin();
    //     expect(homeLogada).not.toBeNull();
    // });

});