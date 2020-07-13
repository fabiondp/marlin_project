import { BoletosService } from './boletos.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss']
})
export class BoletoComponent implements OnInit, AfterViewInit {
  selectedAll: any;

  carregandoFormulario = true;
  exibirFormulario = false;
  messageStatus: string;
  messages = null;
  typeMessage = null;
  timeMessage = null;

  boletos: any;
  ordenacao = '1';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private boletosService: BoletosService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;

    setTimeout(function() {
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
    this.selectedAll = this.boletos.every(function(grupoData: any) {
      return grupoData.Lista.every(itemImovel => {
        return itemImovel.Selected;
      });
    });
  }

  gerarBoletos(form) {
    this.router.navigate(['/autogestao', 'boleto', 'gerados']);
  }
}
