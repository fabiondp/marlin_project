import { DadosContratoLocacao } from './../../salvar-imovel/salvar-contrato/salvar-dados-contrato/dados-contrato-locacao';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LocatarioFiadorGarantia } from '../../salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/locatario-fiador-garantia';

@Component({
  selector: 'app-visualizar-dados-contrato',
  templateUrl: './visualizar-dados-contrato.component.html',
  styleUrls: ['./visualizar-dados-contrato.component.scss']
})
export class VisualizarDadosContratoComponent implements OnInit, OnChanges {
  @Input()
  contratoLocacao;

  dadosContratoLocacao: DadosContratoLocacao;
  locatarioFiadorGarantia: LocatarioFiadorGarantia;

  @Input()
  imovel;

  @Input()
  LocatarioContatosTelFixo;

  @Input()
  LocatarioContatosTelCel;

  @Input()
  FiadorContatosTelFixo;

  @Input()
  FiadorContatosTelCel;

  constructor() {
    this.contratoLocacao = {};
    this.dadosContratoLocacao = new DadosContratoLocacao();
    this.locatarioFiadorGarantia = new LocatarioFiadorGarantia();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.contratoLocacao) {
      this.dadosContratoLocacao.map(this.contratoLocacao);
    }

    if (this.contratoLocacao && this.contratoLocacao.Locatario) {
      this.locatarioFiadorGarantia.map(this.contratoLocacao);

    }
  }

  locatarioPessoaFisica() {
    return this.locatarioFiadorGarantia.Locatario.TipoPessoa === 1;
  }

  fiadorPessoaFisica() {
    return this.locatarioFiadorGarantia.Fiador.TipoPessoa === 1;
  }
}
