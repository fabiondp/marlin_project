import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico-boletos',
  templateUrl: './historico-boletos.component.html',
  styleUrls: ['./historico-boletos.component.scss']
})
export class HistoricoBoletosComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}
}
