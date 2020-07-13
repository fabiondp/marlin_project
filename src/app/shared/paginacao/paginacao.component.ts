import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() personalisarItensPorPagina = false;
  @Input() paginaCorrente: number;
  @Input() qtdItensPorPagina = 3;
  @Input() qtdTotalDeItensEncontrados = 0;
  @Input() indicePrimeiroResultadoApresentado = 0;
  @Input() indiceUltimoResultadoApresentado = 0;

  @Output() atualizarPagina = new EventEmitter();
  @Output() atualizarQtdDeItensPorPagina = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.escutarAlteracaoDaQtdDeItensPorPagina();
  }

  ngOnChanges() {}

  _atualizarPagina(e) {
    if (
      e.page !== this.paginaCorrente ||
      e.itemsPerPage !== this.qtdItensPorPagina
    ) {
      this.atualizarPagina.emit({
        paginaCorrente: e.page,
        qtdItensPorPagina: e.itemsPerPage
      });
    }
  }

  _atualizarQtdDeItensPorPagina(e) {
    e = Number(e);

    if (e !== this.qtdItensPorPagina && !isNaN(e)) {
      this._atualizarPagina({ page: 1, itemsPerPage: e });
    }
  }

  escutarAlteracaoDaQtdDeItensPorPagina() {
    const self = this;

    setTimeout(function() {
      const input = document.getElementById('qtdItensPorPagina');

      if (input) {
        const input$ = fromEvent(input, 'input');

        input$.map(x => {
          return x;
        });
        input$.debounceTime(800).subscribe((x: any) => {
          self._atualizarQtdDeItensPorPagina(x.target.value);
        });
      }
    }, 1000);
  }
}
