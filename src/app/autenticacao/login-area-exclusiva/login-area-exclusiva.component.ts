import { UsuarioService } from './../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-area-exclusiva',
  templateUrl: './login-area-exclusiva.component.html',
  styleUrls: ['./login-area-exclusiva.component.scss']
})
export class LoginAreaExclusivaComponent implements OnInit, OnDestroy {
  user = {
    Login: '',
    Senha: ''
    // ,
    // grant_type: 'password',
    // scope: 'ClickAlugue'
  };
  redirectDashboard = ['/dashboard'];
  redirectUsuarioEditar = ['/usuario/editar'];

  carregandoForm = false;

  emailCadastro;
  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
  invalidEmailFormat = false;
  message = null;
  typeMessage = null;
  timeMessage = null;
  messageArray = null;

  validandoEmail = false;
  mensagensValidacaoEmail = null;

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  ngOnInit() {
    this.messageService.message = null;
    this.messageService.typeMessage = null;

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  ngOnDestroy() {
    this.message = '';
    this.typeMessage = '';
  }

  onSubmitLogin(loginForm: NgForm) {
    this.carregandoForm = true;
    this.message = '';

    this.authService
      .loginAreaExclusiva(this.user)
      .then(response => {
        this.carregandoForm = false;
        if (
          this.authService.user.cadastroCompleto === true &&
          this.returnUrl == null
        ) {
          this.router.navigate(this.redirectDashboard);
        } else {
          this.router.navigate(this.redirectUsuarioEditar);
        }
      })
      .catch(error => {
        this.carregandoForm = false;

        if (Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (
          typeof error === 'object' &&
          error.error &&
          error.error.Message
        ) {
          this.message = [error.error.Message];
        } else if (typeof error === 'string') {
          this.message = [error];
        } else {
          this.message = ['Erro inesperado.'];
        }

        this.typeMessage = 'danger';

        window.scrollTo(0, 0);
      });
  }
}
