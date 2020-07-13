import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  sequence,
  transition,
  animate
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyPipe } from '@angular/common';
import {
  DomSanitizer,
  SafeUrl,
  SafeResourceUrl
} from '@angular/platform-browser';
import { AnuncioService } from '../../services/anuncio.service';
import { ModalComponent } from '../../bootstrap/modal/modal.component';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss'],
  animations: [
    trigger('animationRemove', [
      transition('* => void', [
        style({
          height: '*',
          opacity: '1',
          transform: 'translateX(0)',
          'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'
        }),
        sequence([
          animate(
            '.25s ease',
            style({
              height: '*',
              opacity: '.2',
              transform: 'translateX(20px)',
              'box-shadow': 'none'
            })
          ),
          animate(
            '.1s ease',
            style({
              height: '0',
              opacity: 0,
              transform: 'translateX(20px)',
              'box-shadow': 'none'
            })
          )
        ])
      ]),
      transition('void => active', [
        style({
          height: '0',
          opacity: '0',
          transform: 'translateX(20px)',
          'box-shadow': 'none'
        }),
        sequence([
          animate(
            '.1s ease',
            style({
              height: '*',
              opacity: '.2',
              transform: 'translateX(20px)',
              'box-shadow': 'none'
            })
          ),
          animate(
            '.35s ease',
            style({
              height: '*',
              opacity: 1,
              transform: 'translateX(0)',
              'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'
            })
          )
        ])
      ])
    ])
  ]
})
export class AnunciosComponent implements OnInit {
  anuncios: Array<any> = [];
  totalAnunciosDisponiveis = null;
  qtdAnuncios = null;
  anunciosRestantes;
  anuncio = {
    FotoDestaque: ''
  };

  carregando = true;
  message = null;
  typeMessage = null;
  timeMessage = null;
  clientId = 1;
  foto = null;
  anuncioToDelete: {
    Uid: string,
    Descricao: string
  };

  @ViewChild(ModalComponent)
  modal: ModalComponent;
  anunciosIlimitados: boolean;

  constructor(
    private anuncioService: AnuncioService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  ngOnInit() {
    setTimeout(() => {
      this.messageService.message = null;
      this.messageService.typeMessage = null;
      this.messageService.timeMessage = null;
    }, 4000);

    this.anunciosDisponiveis();
  }

  anunciosDisponiveis() {
    this.carregando = true;
    this.anuncioService.getAllHomeByClienteId().subscribe(
      data => {
        this.totalAnunciosDisponiveis = data.TotalAnunciosDisponiveis;
        this.anunciosIlimitados = data.AnunciosIlimitado;
        // this.carregando = false;
        this.carregarAnuncios();
      },
      error => {
        this.carregando = false;
        if (Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (typeof error === 'object') {
          this.message = [error.error.Message];
        } else if (typeof error === 'string') {
          this.message = [error];
        } else {
          this.message = ['Erro inesperado.'];
        }
        this.typeMessage = 'danger';

        window.scrollTo(0, 0);
      }
    );
  }

  possuiContratoDeAnuncios() {
    if (this.totalAnunciosDisponiveis === 0 && this.anuncios.length === 0 && !this.anunciosIlimitados) {
      this.router.navigate(['dashboard']);
    }
  }

  carregarAnuncios() {
    this.carregando = true;
    this.anuncioService.getAllByClienteId().subscribe(
      data => {
        this.anuncios = data;
        this.carregando = false;

        this.qtdAnuncios = this.anuncios.length;
        this.possuiContratoDeAnuncios();
      },
      error => {
        this.carregando = false;
        this.message = error.error.map(el => el.Message);
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
        this.possuiContratoDeAnuncios();
      }
    );
  }

  remove() {
    this.carregando = true;
    this.anuncioService.remove(this.anuncioToDelete.Uid).subscribe(
      () => {
        this.modal.close();
        // this.messageService.message = 'Anúncio excluído com sucesso';
        // this.message = this.messageService.message;
        this.carregando = false;
        this.message = ['Anúncio excluído com sucesso'];
        this.typeMessage = 'success';
        this.timeMessage = 4000;

        const index = this.anuncios.indexOf(this.anuncioToDelete);
        this.anuncios.splice(index, 1);
        window.scrollTo(0, 0);
        // this.carregarAnuncios();
        this.anunciosDisponiveis();
      },
      error => {
        this.carregando = false;
        this.message = error.error.map(el => el.Message);
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  openModal(anuncio) {
    this.anuncioToDelete = anuncio;
    this.modal.open();
  }
}
