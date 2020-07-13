import { Component, OnInit, Input } from '@angular/core';
import { TituloCapitalizacao } from './titulo-capitalizacao';
import { ControlContainer, NgForm } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-titulo-capitalizacao',
  templateUrl: './titulo-capitalizacao.component.html',
  styleUrls: ['./titulo-capitalizacao.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TituloCapitalizacaoComponent implements OnInit {

  @Input()
  tituloCapitalizacao;

  minDate = moment().add(1, 'days').toDate();

  // @Output()
  // seguroFiancaChange;

  constructor() {
    this.tituloCapitalizacao = new TituloCapitalizacao();
  }

  ngOnInit() {
  }
}
