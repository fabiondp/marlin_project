
import { element } from 'protractor';
import { InfoWindowManager } from '@agm/core';
import { Home } from './Home.po';


fdescribe('Home da area publica', () => {
  let page: Home;

  beforeEach(() => {
    page = new Home();
    page.navegarParaHome();
  });

  it('Verificar titulo da janela', () => {

    expect(page.getTitle()).toEqual('Click Alugue');
  });

  describe('Rodape', () => {

    it('obter conta das redes sociais', () => {
      expect(page.getElementByClass('col-xs-4 col-sm-4 col-md-2 text-left').getText()).toContain('apsaoficial');
    });
  });
});

