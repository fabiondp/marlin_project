import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { BoletosService } from '../boletos.service';

@Component({
  selector: 'app-boleto-por-imovel',
  templateUrl: './boleto-por-imovel.component.html',
  styleUrls: ['./boleto-por-imovel.component.scss']
})
export class BoletoPorImovelComponent implements OnInit, AfterViewInit {
  selectedAll: any;

  carregandoFormulario = true;
  exibirFormulario = false;
  messageStatus: string;
  messages = null;
  typeMessage = null;
  timeMessage = null;
  ordenacao = '2';

  boletos: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private boletosService: BoletosService
  ) { }

  ngOnInit() { }
  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;

    setTimeout(function () {
      self.buscarBoletos();
    }, 500);
  }
  buscarBoletos() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    this.boletosService.getBoletos(this.ordenacao).subscribe(
      data => {
        this.boletos = data.ListaAgrupada;
        this.exibirFormulario = true;
        this.carregandoFormulario = false;
      },
      error => {
        this.carregandoFormulario = false;
        this.messages = [
          'Ocorreu um erro inesperado e não foi possível carregar as opçoes de formulário. Tente novamente mais tarde!'
        ];
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  existeBoletos() {
    return (
      this.boletos !== null &&
      this.boletos !== undefined &&
      Array.isArray(this.boletos) &&
      this.boletos.length > 0
    );
  }

  selectAll() {
    this.boletos.forEach(grupoData => {
      grupoData.Lista.forEach(itemImovel => {
        itemImovel.Selected = this.selectedAll;
      });
    });
  }

  checkIfAllSelected() {
    this.selectedAll = this.boletos.every(function (grupoData: any) {
      return grupoData.Lista.every(itemImovel => {
        return itemImovel.Selected;
      });
    });
  }

  gerarBoletos(form) {
    this.router.navigate(['/autogestao', 'boleto', 'gerados']);
  }
}
