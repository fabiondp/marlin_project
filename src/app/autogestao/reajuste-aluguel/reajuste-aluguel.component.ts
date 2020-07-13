import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ReajusteAluguelService } from './reajuste-aluguel.service';
import { ModalComponent } from 'app/bootstrap/modal/modal.component';

@Component({
  selector: 'app-reajuste-aluguel',
  templateUrl: './reajuste-aluguel.component.html',
  styleUrls: ['./reajuste-aluguel.component.scss']
})
export class ReajusteAluguelComponent implements OnInit, AfterViewInit {
  @ViewChild('modalConfirmacaoReajuste')
  modalConfirmacaoReajuste: ModalComponent;

  carregando: boolean;
  messageStatus: string;
  messages = null;
  typeMessage = null;
  timeMessage = null;

  processandoReajuste: boolean;
  mensagensReajuste = null;

  percentualReajuste: string;

  tiposIndices: any[];

  selectedAll: boolean;

  constructor(private reajusteAluguelService: ReajusteAluguelService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;

    setTimeout(function() {
      self.buscarImoveisParaReajuste();
    }, 500);
  }

  buscarImoveisParaReajuste() {
    this.carregando = true;

    this.reajusteAluguelService.obterImoveisParaReajuste().subscribe(
      response => {
        this.tiposIndices = response['ListaAgrupada'];
        this.carregando = false;
      },
      error => {
        this.carregando = false;
        // this.messages = error;
        // this.typeMessage = 'danger';
      }
    );
  }

  selectAll() {
    this.tiposIndices.forEach(grupoData => {
      grupoData.Lista.forEach(itemImovel => {
        itemImovel.Selected = this.selectedAll;
      });
    });
  }

  checkIfAllSelected() {
    this.selectedAll = this.tiposIndices.every(function(grupoData: any) {
      return grupoData.Lista.every(itemImovel => {
        return itemImovel.Selected;
      });
    });
  }

  abrirModalConfirmacaoReajuste() {
    window.scrollTo(0, 0);
    this.messages = null;
    this.typeMessage = null;

    if (this.percentualReajuste != null) {
      this.mensagensReajuste = null;
      this.modalConfirmacaoReajuste.open();
    } else {
      this.messages = ['Percentual de reajuste é obrigatório!'];
      this.typeMessage = 'danger';
    }
  }

  aplicarPercentualReajuste() {
    this.processandoReajuste = true;
    window.scrollTo(0, 0);
    this.messages = null;
    this.mensagensReajuste = null;
    this.typeMessage = null;

    const data = {
      ListaAgrupada: this.obterContratosSelecionados(),
      PercentualReajuste: this.percentualReajuste
    };

    this.reajusteAluguelService.aplicarPercentualReajuste(data).subscribe(
      response => {
        this.removerContratosReajustados();

        this.messages = ['Reajuste realizado com sucesso!'];
        this.typeMessage = 'success';
        this.percentualReajuste = null;
        this.processandoReajuste = false;

        this.modalConfirmacaoReajuste.close();

        window.scrollTo(0, 0);
      },
      error => {
        this.processandoReajuste = false;
        this.mensagensReajuste = error;
        window.scrollTo(0, 0);
      }
    );
  }

  removerContratosReajustados() {
    this.tiposIndices.forEach((grupoData, indextiposIndice) => {
      grupoData.Lista.forEach((itemImovel, indexImovel) => {
        if (itemImovel.Selected === true) {
          this.tiposIndices[indextiposIndice].Lista.splice(indexImovel, 1);
        }
      });
    });
  }

  obterContratosSelecionados() {
    if (this.tiposIndices) {
      return this.tiposIndices.filter(t => {
        // tslint:disable-next-line:prefer-const
        let contratosSelecionados = t.Lista.filter(i => {
          return i.Selected;
        });

        return contratosSelecionados.some(i => i);
      });
    }
    return null;
  }
}
