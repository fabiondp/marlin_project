import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DadosImovel } from '../../salvar-imovel/salvar-dados-imovel/dados-imovel';

@Component({
  selector: 'app-visualizar-dados-imovel',
  templateUrl: './visualizar-dados-imovel.component.html',
  styleUrls: ['./visualizar-dados-imovel.component.scss']
})
export class VisualizarDadosImovelComponent implements OnInit, AfterViewInit {
  @Input() imovel: DadosImovel;
  constructor() {
    this.imovel = new DadosImovel();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.imovel.panelIndoBasicasIsOpen = true;
    this.imovel.panelInfoTaxasIsOpen = true;
    this.imovel.panelInfoCondominioIsOpen = true;
    this.imovel.panelInfoSeguroIsOpen = true;
    this.imovel.panelInfoDiversosIsOpen = true;
  }
}
