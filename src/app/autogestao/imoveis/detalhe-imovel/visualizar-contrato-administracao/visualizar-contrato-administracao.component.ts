import { DadosImovel } from './../../salvar-imovel/salvar-dados-imovel/dados-imovel';
import { Component, OnInit, Input } from '@angular/core';
import { ContratoAdministracao } from '../../salvar-imovel/salvar-contrato-administracao/contrato-administracao';

@Component({
  selector: 'app-visualizar-contrato-administracao',
  templateUrl: './visualizar-contrato-administracao.component.html',
  styleUrls: ['./visualizar-contrato-administracao.component.scss']
})
export class VisualizarContratoAdministracaoComponent implements OnInit {

  @Input() imovel: DadosImovel;
  @Input() contratoAdministracao: ContratoAdministracao;
  @Input() opcoesTipoTaxaAdministracao: any[];
  @Input() opcoesDias: any[];


  constructor() {
    this.imovel = new DadosImovel();
    this.contratoAdministracao = new ContratoAdministracao();
  }

  ngOnInit() {
  }

}
