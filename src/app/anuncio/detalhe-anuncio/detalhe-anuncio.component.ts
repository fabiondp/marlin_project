import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgModule,
  Renderer
} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AnuncioService } from '../../services/anuncio.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SlickModule } from 'ngx-slick';
import { AgmMap } from '@agm/core';
import { ModalComponent } from '../../bootstrap/modal/modal.component';

@Component({
  selector: 'app-detalhe-anuncio',
  templateUrl: './detalhe-anuncio.component.html',
  styleUrls: ['./detalhe-anuncio.component.scss']
})
export class DetalheAnuncioComponent implements OnInit {
  message = null;
  typeMessage = null;
  timeMessage = null;
  anuncioToDelete: {
    Uid: null;
  };
  @ViewChild(ModalComponent) modal: ModalComponent;

  public element: any;
  anuncio = {
    Uid: null,
    Fotos: []
  };

  showCelApsa = false;
  showTelApsa = false;
  hasFotos = false;
  carregando = true;
  qtdFotos = null;

  slideFotos = [];

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(
    private anuncioService: AnuncioService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  afterChange(e) {

  }

  ngOnInit() {
    this.carregando = true;
    this.route.params.subscribe(params => {
      // this.Uid = params['Uid'];
      this.anuncioService.find(params['Uid']).subscribe(
        data => {
          this.anuncio = data;
          this.carregando = false;
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
    });
  }
  showCel(event) {
    this.showCelApsa = !this.showCelApsa;
    return false;
  }
  showTel(event) {
    this.showTelApsa = !this.showTelApsa;
    return false;
  }

  remove() {
    this.anuncioService.remove(this.anuncioToDelete.Uid).subscribe(
      () => {
        this.modal.close();
        this.messageService.message = 'Anúncio excluído com sucesso';
        this.router.navigate(['/anuncios']);
        window.scrollTo(0, 0);
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
