import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-lembrar-senha',
  templateUrl: './lembrar-senha.component.html',
  styleUrls: ['./lembrar-senha.component.scss']
})
export class LembrarSenhaComponent implements OnInit {
  emailCadastro;
  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
  invalidEmailFormat = false;
  message = null;
  typeMessage = null;
  timeMessage = null;
  messageArray = null;
  enviado = false;
  carregandoForm = false;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  ngOnDestroy() {
    this.message = '';
    this.typeMessage = '';
  }
  ngOnInit() { }
  onSubmit(esqueciForm: NgForm) {
    this.carregandoForm = true;
    const matching = this.emailCadastro.match(this.emailPattern);
    this.invalidEmailFormat = false;

    if (!matching) {
      this.invalidEmailFormat = true;
    } else {
      this.usuarioService.lembrarSenha(this.emailCadastro).subscribe(
        () => {
          this.carregandoForm = false;
          this.router.navigate(['/autenticacao/login']);
          this.messageService.message = ['E-mail enviado com sucesso.'];
          this.messageService.typeMessage = 'success';
          this.messageService.timeMessage = null;
        },
        error => {
          this.carregandoForm = false;
          this.message = error.error.map(el => el.Message);
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
        }
      );
    }
  }
}
