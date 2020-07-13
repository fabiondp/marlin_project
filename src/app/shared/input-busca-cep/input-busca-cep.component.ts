import { ControlContainer, NgForm } from '@angular/forms';
import {
  Component,
  OnInit,
  NgZone,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener
} from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { InputBuscaCepService } from "./input-busca-cep.service";
import { Endereco } from "./endereco";

@Component({
  selector: "app-input-busca-cep",
  templateUrl: "./input-busca-cep.component.html",
  styleUrls: ["./input-busca-cep.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],

})
export class InputBuscaCepComponent
  implements OnInit, OnChanges, AfterViewInit {
  public maskCep = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
  public buscouCep: boolean;

  @ViewChild('Numero') Numero;

  // Numero

  @Input() public carregandoEndereco: boolean;
  @Output()
  carregandoEnderecoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public erros: any[];
  public keyupSub: Subscription;

  @Input() public maxColumnlayout = 0;

  @Input() public disableEdit = false;

  @Input() endereco: Endereco;

  @Output()
  enderecoChange: EventEmitter<Endereco> = new EventEmitter<Endereco>();

  @Input() enderecoValido: boolean;

  @Output()
  enderecoValidoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("cepEl") inputCepElRef: ElementRef;

  ultimaBuscaDeCep: string;

  constructor(
    private inputBuscaCepService: InputBuscaCepService,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private form: NgForm
  ) {
    this.enderecoValido = false;
  }

  ngOnInit() {
    this.verificarSePossuiDados();
    this.ultimaBuscaDeCep = this.endereco.CEP;
  }

  ngOnChanges() {
    this.verificarSePossuiDados();
  }

  ngAfterViewInit() {
    // if (this.inputCepElRef !== undefined) {
    //   const self = this;

    //   setTimeout(function () {
    //     self.keyupSub = Observable.fromEvent(
    //       self.inputCepElRef.nativeElement,
    //       "keyup"
    //     )
    //       .debounceTime(1000)
    //       .subscribe((keyboardEvent: any) => {
    //         // this.buscarEnderecoPorCep();
    //         self.cdref.detectChanges();
    //       });
    //   }, 500);
    // }
  }

  verificarSePossuiDados() {
    this.buscouCep =
      this.endereco &&
      this.possuiCEP() &&
      this.possuiLogradouro() &&
      this.possuiBairro() &&
      this.possuiCidade() &&
      this.possuiEstado();

    this._verificarSeEnderecoValido();
  }

  _verificarSeEnderecoValido() {
    this.enderecoValido =
      this.endereco !== null &&
      this.endereco !== undefined &&
      this.possuiCEP() &&
      this.possuiLogradouro() &&
      this.possuiBairro() &&
      this.possuiCidade() &&
      this.possuiEstado() &&
      this.possuiNumero();

    this.enderecoValidoChange.emit(this.enderecoValido);
  }

  possuiCEP() {
    return (
      this.endereco.CEP !== null &&
      this.endereco.CEP !== undefined &&
      this.endereco.CEP.trim() !== ""
    );
  }

  possuiLogradouro() {
    return (
      this.endereco.Logradouro !== null &&
      this.endereco.Logradouro !== undefined &&
      this.endereco.Logradouro.trim() !== ""
    );
  }

  possuiBairro() {
    return (
      this.endereco.Bairro !== null &&
      this.endereco.Bairro !== undefined &&
      this.endereco.Bairro.trim() !== ""
    );
  }

  possuiCidade() {
    return (
      this.endereco.Cidade !== null &&
      this.endereco.Cidade !== undefined &&
      this.endereco.Cidade.trim() !== ""
    );
  }

  possuiEstado() {
    return (
      this.endereco.Estado !== null &&
      this.endereco.Estado !== undefined &&
      this.endereco.Estado.trim() !== ""
    );
  }

  possuiNumero() {
    return (
      this.endereco.Numero !== null &&
      this.endereco.Numero !== undefined &&
      this.endereco.Numero.trim() !== ""
    );
  }

  onEnderecoChange() {
    this.enderecoChange.emit(this.endereco);
    this._verificarSeEnderecoValido();
  }

  resetFields() {
    this.Numero.reset();
  }

  buscarEnderecoPorCep(e?) {
    if (e) {
      e.preventDefault();
    }

    if (this.ultimaBuscaDeCep !== this.endereco.CEP) {
      this.resetFields();

      this.carregandoEndereco = true;
      this.carregandoEnderecoChange.emit(this.carregandoEndereco);
      this.erros = null;

      if (this.endereco) {
        this.limparDadosDeEndereco();
        this.atualizarEndereco();
        this.buscouCep = false;

        this.inputBuscaCepService
          .getEndereco(this.endereco.CEP)
          .subscribe(
            response => {
              this.ultimaBuscaDeCep = this.endereco.CEP;
              this.atualizarEndereco(Endereco.map(response));
              this.buscouCep = true;
              this.carregandoEndereco = false;
              this.carregandoEnderecoChange.emit(this.carregandoEndereco);
            },
            error => {
              this.ultimaBuscaDeCep = this.endereco.CEP;
              this.exibirErro(error);
              this.carregandoEndereco = false;
              this.carregandoEnderecoChange.emit(this.carregandoEndereco);
            }
          );
      }
    }
  }

  cepValido() {
    return (
      this.endereco
      && this.endereco.CEP
      && this.endereco.CEP.length >= 9
    )
  }

  limparDadosDeEndereco() {
    this.endereco.Estado = null;
    this.endereco.Cidade = null;
    this.endereco.Bairro = null;
    this.endereco.Logradouro = null;
    this.endereco.Numero = null;
    this.endereco.Complemento = null;
  }

  exibirErro(error) {
    this.erros = [
      "Não foi possível identificar o CEP informado. Preencha os campos abaixo!"
    ];

    // if (error.status === 404) {
    //   this.erros = ['Cep não identificado!'];
    // } else if (error && Array.isArray(error) && error.some(e => e.hasOwnProperty('Message'))) {
    //   this.erros = error.map(e => e.Message);
    // } else if (error.message) {
    //   this.erros = [error.message];
    // } else {
    //   this.erros = ['Não foi possível identificar o CEP informado. Preencha os campos abaixo!'];
    // }
  }

  atualizarEndereco(endereco?) {
    if (endereco) {
      this.endereco = endereco;
      this.enderecoChange.emit(this.endereco);
    } else {
      this.enderecoChange.emit(this.endereco);
    }

    this._verificarSeEnderecoValido();
  }

  limparEndereco(e?) {
    if (e) {
      e.preventDefault();
    }

    this.atualizarEndereco(new Endereco());
    this.buscouCep = false;
  }

  getCssClassRowCEP() {
    return this.maxColumnlayout === 2 ? "col-md-6" : "col-md-4";
  }

  getCssClassColLogradouro() {
    return this.maxColumnlayout === 2 ? "col-md-8" : "col-md-7";
  }

  getCssClassColNumero() {
    return this.maxColumnlayout === 2 ? "col-md-4" : "col-md-2";
  }

  getCssClassColComplemento() {
    return this.maxColumnlayout === 2 ? "col-md-6" : "col-md-3";
  }

  getCssClassColBairro() {
    return this.maxColumnlayout === 2 ? "col-md-6" : "col-md-4";
  }

  getCssClassColCidade() {
    return this.maxColumnlayout === 2 ? "col-md-6" : "col-md-4";
  }

  getCssClassColEstado() {
    return this.maxColumnlayout === 2 ? "col-md-6" : "col-md-4";
  }

  getCssClassColLimparEndereco() {
    return this.maxColumnlayout === 2 ? "col-md-6 clearfix text-center" : "col-md-4 clearfix text-center";
  }
}
