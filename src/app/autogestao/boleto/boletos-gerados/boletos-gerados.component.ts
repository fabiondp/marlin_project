import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';

@Component({
  selector: 'app-boletos-gerados',
  templateUrl: './boletos-gerados.component.html',
  styleUrls: ['./boletos-gerados.component.scss']
})
export class BoletosGeradosComponent implements OnInit {
  rows = [
    {
      data: '01/01',
      imoveis: [
        {
          name: 'Rua Voluntários da Pátria 860/ 202',
          gender: 'Male',
          company: 'Swimlane',
          selected: false,
          date: '11/12'
        },
        {
          name: '7 Rua Voluntários da Pátria 860/ 101',
          gender: 'Male',
          company: 'KFC',
          selected: false,
          date: '12/12'
        }
      ],
      selected: false
    },
    {
      data: '02/01',
      imoveis: [
        {
          name: '1 Rua Voluntários da Pátria 860/ 202',
          gender: 'Male',
          company: 'Swimlane',
          selected: false,
          date: '11/12'
        },
        {
          name: '7 Rua Voluntários da Pátria 860/ 101',
          gender: 'Male',
          company: 'KFC',
          selected: false,
          date: '12/12'
        }
      ],
      selected: false
    }
  ];

  @ViewChild(ModalComponent)
  modal: ModalComponent;
  constructor() {}

  ngOnInit() {
    this.modal.open();
  }
}
