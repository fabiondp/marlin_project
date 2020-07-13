import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'app-modal-token-expirado',
  templateUrl: './modal-token-expirado.component.html',
  styleUrls: ['./modal-token-expirado.component.scss']
})
export class ModalTokenExpiradoComponent {

  redirecionarParaLogin: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
  ) { }

  irParaLogin() {
    this.redirecionarParaLogin = true;
    this.bsModalRef.hide();
  }

  fechar() {
    this.bsModalRef.hide();
  }
}
