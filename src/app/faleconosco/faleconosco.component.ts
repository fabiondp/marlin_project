import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'app/bootstrap/modal/modal.component';
import { AuthService } from 'app/services/auth.service';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-faleconosco',
  templateUrl: './faleconosco.component.html',
  styleUrls: ['./faleconosco.component.scss']
})
export class FaleconoscoComponent implements OnInit {
  @ViewChild('modalFaleConosco') modalFaleConosco: ModalComponent;

  faleConosco = {
    nome: this.authService.user.nome,
    email: this.authService.user.email,
    assunto: null,
    mensagem: ''
  };

  messageFaleConosco = null;
  typeMessageFaleConosco = null;
  timeMessageFaleConosco = null;

  mensagemEnviada = false;
  carregando = true;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
  }

  abrirModalFaleConosco() {
    this.modalFaleConosco.open();
    (<any>window).ga('send', 'event', {
      eventCategory: 'click',
      eventLabel: 'faleconosco',
      eventAction: 'abrir modal faleconosco'
    });
  }

  fecharMensagem() {
    this.modalFaleConosco.close();
    setTimeout(() => {
      this.mensagemEnviada = false;
    }, 1000);
  }


  enviarMensagem() {
    this.carregando = true;
    this.messageFaleConosco = null;

    this.usuarioService.faleConoscoMensagens(this.faleConosco).subscribe(
      () => {
        this.carregando = false;
        this.messageFaleConosco = [`Mensagem enviada com sucesso`];
        this.typeMessageFaleConosco = 'success';
        this.timeMessageFaleConosco = 4000;
        this.mensagemEnviada = true;

        (<any>window).ga('send', 'event', {
          eventCategory: 'submit',
          eventLabel: 'faleconosco',
          eventAction: 'enviar formulário faleconosco'
        });

        // if (this.authService.check) {
        //   this.faleConosco.nome = this.authService.user.nome;
        //   this.faleConosco.email = this.authService.user.email;
        // }

        // setTimeout(() => {
        //   this.modal.close();
        // }, 4000);
      },
      error => {
        this.mensagemEnviada = false;

        if (Array.isArray(error.error)) {
          this.messageFaleConosco = error.error.map(el => el.Message);
        } else if (typeof error === 'object') {
          this.messageFaleConosco = [error.error.Message];
        } else if (typeof error === 'string') {
          this.messageFaleConosco = [error];
        } else {
          this.messageFaleConosco = ['Erro inesperado.'];
        }

        this.typeMessageFaleConosco = 'danger';
        this.carregando = false;
      }
    );
  }

}
