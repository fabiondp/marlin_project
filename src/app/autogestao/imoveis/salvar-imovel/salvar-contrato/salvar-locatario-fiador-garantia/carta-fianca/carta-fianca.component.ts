import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { CartaFianca } from './carta-fianca';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

import * as moment from 'moment';

@Component({
  selector: 'app-carta-fianca',
  templateUrl: './carta-fianca.component.html',
  styleUrls: ['./carta-fianca.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CartaFiancaComponent implements OnInit {

  @Input()
  cartaFianca;

  minDate = moment().add(1, 'days').toDate();

  // @Output()
  // seguroFiancaChange;

  constructor(
    private localeService: BsLocaleService
  ) {
    this.cartaFianca = new CartaFianca();
    this.localeService.use('pt-br');
  }

  ngOnInit() {
  }

}
