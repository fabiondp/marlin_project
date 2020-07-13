import { Component, OnInit, Input } from '@angular/core';
// tslint:disable-next-line:max-line-length
// import { SalvarDadosLocatarioService } from 'app/autogestao/salvar-imovel/salvar-contrato/salvar-dados-locatario/salvar-dados-locatario.service';


@Component({
  selector: 'app-visualizar-dados-locatario',
  templateUrl: './visualizar-dados-locatario.component.html',
  styleUrls: ['./visualizar-dados-locatario.component.scss']
})
export class VisualizarDadosLocatarioComponent implements OnInit {
  @Input() locatario;
  constructor() { }

  ngOnInit() {
  }

}
