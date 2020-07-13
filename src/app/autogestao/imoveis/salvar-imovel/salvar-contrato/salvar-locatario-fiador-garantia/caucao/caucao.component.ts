import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Caucao } from './caucao';

@Component({
  selector: 'app-caucao',
  templateUrl: './caucao.component.html',
  styleUrls: ['./caucao.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CaucaoComponent implements OnInit {

  @Input()
  caucao;

  // @Output()
  // seguroFiancaChange;

  constructor() {
    this.caucao = new Caucao();
  }

  ngOnInit() {
  }

}
