import { Component, OnInit, Input, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { SeguroFianca } from './seguro-fianca';

import * as moment from 'moment';

@Component({
  selector: 'app-seguro-fianca',
  templateUrl: './seguro-fianca.component.html',
  styleUrls: ['./seguro-fianca.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class SeguroFiancaComponent implements OnInit {

  @Input()
  seguroFianca;

  minDate = moment().add(1, 'days').toDate();

  // @Output()
  // seguroFiancaChange;

  constructor() {
    this.seguroFianca = new SeguroFianca();
  }

  ngOnInit() {
  }

}
