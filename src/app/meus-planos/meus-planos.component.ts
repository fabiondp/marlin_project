import { environment } from 'environments/environment';
import { MessageService } from '../services/message.service';
import { UsuarioService } from '../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meus-planos',
  templateUrl: './meus-planos.component.html',
  styleUrls: ['./meus-planos.component.scss']
})
export class MeusPlanosComponent implements OnInit {
  PlanosAnuncios = [];
  PlanosAutoGestao = [];
  carregando = true;
  message = null;
  typeMessage = null;
  timeMessage = null;
  enableAutoGestaoDeLocacao: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {
    // this.message = this.messageService.message;
    // this.typeMessage = this.messageService.typeMessage;
    // this.timeMessage = this.messageService.timeMessage;


    this.enableAutoGestaoDeLocacao = environment.enableAutoGestaoDeLocacao;
  }

  ngOnInit() {
    this.usuarioService.planosContratados().subscribe(
      data => {
        this.PlanosAnuncios = data.PlanosAnuncios;

        if (this.enableAutoGestaoDeLocacao) {
          this.PlanosAutoGestao = data.PlanosAutoGestao;
        }

        this.carregando = false;
      },
      error => {
        this.carregando = false;
        if (error.status === 404) {
          this.PlanosAnuncios = [];
          this.PlanosAutoGestao = [];
        } else {
          this.message = error.error.map(el => el.Message);
          this.typeMessage = 'danger';
        }
        window.scrollTo(0, 0);
      }
    );
  }
}
