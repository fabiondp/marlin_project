import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { GarantiaOutros } from './garantia-outros';

@Component({
  selector: 'app-garantia-outros',
  templateUrl: './garantia-outros.component.html',
  styleUrls: ['./garantia-outros.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GarantiaOutrosComponent implements OnInit {

  @Input()
  garantiaOutros;

  constructor() {
    this.garantiaOutros = new GarantiaOutros();
  }

  ngOnInit() {
  }

}
