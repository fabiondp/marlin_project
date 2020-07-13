import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalComponent } from '../../bootstrap/modal/modal.component';
import { LoginComponent } from '../login/login.component';

const { log } = console;
@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;
  enviado: boolean;
  carregandoForm: boolean;
  senhaAtual;
  redefinir = { senha: '', confirmaSenha: '' };
  redirectDashboard = ['/dashboard'];
  redirectCarrinho = ['/carrinho'];
  message;
  typeMessage;
  timeMessage;
  returnUrl;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    log(this.route);
    this.enviado = false;
  }

  // closeModal() {
  //   this.modal.close();

  //
  // }

  onSubmitRedefinir(redefinirForm: NgForm) {
    this.message = null;
    this.typeMessage = null;
    this.carregandoForm = true;
    if (redefinirForm.valid) {
      if (
        this.senhaAtual.length >= 6 &&
        (this.redefinir.senha.length >= 6 &&
          this.redefinir.confirmaSenha.length >= 6)
      ) {
        const senhaAtual = this.senhaAtual;
        const senhaNova = this.redefinir.senha;
        this.usuarioService.redefinirSenha({ senhaAtual, senhaNova }).subscribe(
          serverResponse => {
            log('Server response: ', serverResponse);
            this.carregandoForm = false;
            this.messageService.message = ['Senha redefinida com sucesso.'];
            this.messageService.typeMessage = 'success';
            this.messageService.timeMessage = 4000;
            this.enviado = true;
            this.authService.atualizarDadosDoUsuario();

            const carrinhoLStorage = localStorage.getItem('carrinho');
            if (
              localStorage.getItem('carrinho') &&
              JSON.parse(carrinhoLStorage).length >= 1
            ) {
              this.router.navigate(this.redirectCarrinho);
            } else {
              this.router.navigate(this.redirectDashboard);
            }
          },
          (err: HttpErrorResponse) => {
            this.carregandoForm = false;
            this.message = err.error.map(el => el.Message);
            this.typeMessage = 'danger';
            this.redefinir.senha = '';
            this.redefinir.confirmaSenha = '';
            window.scrollTo(0, 0);
          }
        );
      } else {
        this.carregandoForm = false;
        this.message = [
          'As senhas precisam ter pelo menos 6 caracteres alfanuméricos'
        ];
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    }
  }
}
