
import { element } from 'protractor';
import { InfoWindowManager } from '@agm/core';
import { Login } from './Login.po';
import { Home } from '../Home/Home.po';
import { HomeLogada } from '../HomeLogada/HomeLogada.po';



fdescribe('Página de login', () => {
  let page: Home;
  let paginaLogin: Login;

  beforeEach(() => {
    page = new Home();
    page.navegarParaHome();
    paginaLogin = page.irParaLogin();

  });

  it('Verificar titulo da janela', () => {
    expect(paginaLogin.getTitle()).toEqual('Click Alugue');
  });

  it('Verificar redes sociais do Rodape', () => {
    expect(paginaLogin.getElementByXpath(paginaLogin.tituloDaPagina).getText())
      .toContain('Identificação');
  });

  it('Realizar Login', () => {
    let homeLogada = paginaLogin.realizarLogin();
    expect(homeLogada).not.toBeNull();
  });

});
