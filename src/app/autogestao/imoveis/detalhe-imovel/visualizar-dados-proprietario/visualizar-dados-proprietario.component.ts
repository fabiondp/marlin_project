import { DadosProprietario } from './../../salvar-imovel/salvar-dados-proprietario/dados-proprietario';
import { Component, OnInit, Input } from '@angular/core';
import { SalvarDadosProprietarioService } from '../../salvar-imovel/salvar-dados-proprietario/salvar-dados-proprietario.service';

@Component({
  selector: 'app-visualizar-dados-proprietario',
  templateUrl: './visualizar-dados-proprietario.component.html',
  styleUrls: ['./visualizar-dados-proprietario.component.scss']
})
export class VisualizarDadosProprietarioComponent implements OnInit {
  @Input() proprietario: DadosProprietario;
  @Input() imovel;

  @Input() opcoesTipoRepresentante;

  constructor(
    private salvarProprietarioService: SalvarDadosProprietarioService
  ) {
    this.proprietario = new DadosProprietario();
  }

  ngOnInit() { }

  proprietarioCasado() {
    return this.proprietario.EstadoCivil === 2;
  }

}
