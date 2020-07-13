import { ProdutoService } from "../../services/produto.service";
import { CarrinhoService } from "../../carrinho/carrinho/carrinho.service";
import { FichaCredito } from "./ficha-credito";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Renderer,
  NgZone
} from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { NgForm, FormControl } from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";
import { MessageService } from "../../services/message.service";
import { AnaliseCreditoService } from "../analise-credito.service";

@Component({
  selector: "app-analise-completa",
  templateUrl: "./analise-completa.component.html",
  styleUrls: ["./analise-completa.component.scss"]
})
export class AnaliseCompletaComponent implements OnInit {
  plano = {
    TituloPlano: "",
    DescricaoPlano: "",
    FichaCredito: new FichaCredito()
  };

  enderecoValido = false;
  // plano: any;

  contatos = [
    {
      Telefone: ""
    }
  ];

  carregando = false;
  messageCarregando: string;

  naturezaPessoa = "CPF";
  naturezaPessoaProprietario = "CPFProprietario";
  TipoPretendente = "1";

  exibirBlocoEndereco = false;

  message = null;
  typeMessage = null;
  timeMessage = null;
  messageArray = null;
  public maskUF = [/[A-Z]/i, /[A-Z]/i];
  public maskCep = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
  public masktel = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  public maskCPF = [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
  ];
  public maskCNPJ = [
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
  ];
  public maskCPFCNPJ = [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
  ];
  public maskcel = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  public localizacao: any = "";
  localicazaoTraduzida = false;
  userSettings: any = {
    inputPlaceholderText: "Digite o endereço completo",
    showRecentSearch: true
  };

  disableRemoveFixo = true;
  disableRemoveCelular = true;
  telefonesFixos = [
    {
      telefone: ""
    }
  ];
  telefonesCelulares = [
    {
      tipo: 2,
      telefone: ""
    }
  ];

  telefone1 = "";
  telefone2 = "";
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private ngZoneService: NgZone,
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService,
    private analiseCreditoService: AnaliseCreditoService
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
  }

  addTelefoneFixo() {
    this.telefonesFixos.push({
      telefone: ""
    });
    this.checkMinimoTelefone();
  }

  deleteTelefoneFixo(i) {
    this.telefonesFixos.splice(i, 1);
    this.checkMinimoTelefone();
  }

  addTelefoneCelular() {
    this.telefonesCelulares.push({
      tipo: 2,
      telefone: ""
    });
    this.checkMinimoTelefone();
  }

  deleteTelefoneCelular(i) {
    this.telefonesCelulares.splice(i, 1);
    this.checkMinimoTelefone();
  }

  checkMinimoTelefone() {
    const fixos = this.telefonesFixos,
      celulares = this.telefonesCelulares;
    const length = fixos.length + celulares.length;

    if (fixos.length > 1) {
      this.disableRemoveFixo = false;
    } else {
      this.disableRemoveFixo = true;
    }

    if (celulares.length > 1) {
      this.disableRemoveCelular = false;
    } else {
      this.disableRemoveCelular = true;
    }
  }

  clearMask(value: string) {
    if (value != null) {
      return value.replace(/\D/g, "");
    }
    return null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["UidPlano"]) {
        this.produtoService.getAllProdutoAnalise().subscribe(
          data => {
            this.plano = data.Planos.find(p => p.Uid === params["UidPlano"]);
            this.plano.FichaCredito = new FichaCredito();
          },
          error => { }
        );
      }
    });
  }

  //#region AutoComplete Endereço

  // atualizarEnderecoPeloCep(_localizacao: google.maps.GeocoderResult) {
  //   this.ngZoneService.run(() => {
  //     if (_localizacao != null) {
  //       this.localizacao = _localizacao;
  //       this.exibirBlocoEndereco = true;
  //       // this.usuario.Logradouro = this.getLogradouro();
  //       // this.usuario.Bairro = this.getBairro();
  //       // this.usuario.Cidade = this.getCidade();
  //       // this.usuario.Estado = this.getEstado();
  //       // this.usuario.CEP = this.getCep();
  //     }
  //   });
  // }

  getLogradouro(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const logradouro = this.localizacao.address_components.filter(function (
        i
      ) {
        return (
          i.types.filter(function (t) {
            return t === "route";
          }).length > 0
        );
      });
      if (logradouro.length > 0) {
        return logradouro[0].long_name;
      }
    }
    return null;
  }

  getNumero(): number {
    if (this.localizacao && this.localizacao.address_components) {
      const numero = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === "street_number";
          }).length > 0
        );
      });
      if (numero.length > 0) {
        return numero[0].long_name;
      }
    }
    return null;
  }

  getCep(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const cep = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === "postal_code";
          }).length > 0
        );
      });
      if (cep.length > 0) {
        return cep[0].long_name;
      }
    }
    return null;
  }

  getBairro(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const bairro = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === "sublocality_level_1";
          }).length > 0
        );
      });
      if (bairro.length > 0) {
        return bairro[0].long_name;
      }
    }
    return null;
  }

  getCidade(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const cidade = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === "administrative_area_level_2";
          }).length > 0
        );
      });
      if (cidade.length > 0) {
        return cidade[0].long_name;
      }
    }
    return null;
  }

  getEstado(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const estado = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === "administrative_area_level_1";
          }).length > 0
        );
      });
      if (estado.length > 0) {
        return estado[0].short_name;
      }
    }
    return null;
  }

  autoCompleteCallback1(response: any): any {
    this.localizacao = response.data;

    this.exibirBlocoEndereco = true;
    this.plano.FichaCredito.Proprietario.Enderecos[0].Numero = this.getNumero();
    this.plano.FichaCredito.Proprietario.Enderecos[0].Logradouro = this.getLogradouro();
    this.plano.FichaCredito.Proprietario.Enderecos[0].Bairro = this.getBairro();
    this.plano.FichaCredito.Proprietario.Enderecos[0].Cidade = this.getCidade();
    this.plano.FichaCredito.Proprietario.Enderecos[0].Estado = this.getEstado();
    this.plano.FichaCredito.Proprietario.Enderecos[0].CEP = this.getCep();
  }

  onSubmit(cadastroUsuarioForm: NgForm) {

    if (cadastroUsuarioForm.valid) {
      if (this.naturezaPessoa === "CPF") {
        this.plano.FichaCredito.Pretendente.NaturezaPessoa = 1;
      } else if (this.naturezaPessoa === "CNPJ") {
        this.plano.FichaCredito.Pretendente.NaturezaPessoa = 2;
      }

      if (this.TipoPretendente === "1") {
        this.plano.FichaCredito.Pretendente.TipoPretendente = 1;
      } else if (this.TipoPretendente === "2") {
        this.plano.FichaCredito.Pretendente.TipoPretendente = 2;
      }

      this.processarTelefones();

      this.validarFichaCredito();
    }
  }

  validarFichaCredito() {
    window.scrollTo(0, 0);
    this.carregando = true;
    this.messageCarregando = "Validando dados da análise";
    this.message = null;
    this.typeMessage = null;

    this.analiseCreditoService.validarFichaCredito(this.plano.FichaCredito)
      .subscribe(
        (response) => {
          this.adicionarCarrinho(this.plano);
          this.carregando = false;
          this.messageCarregando = null;
          window.scrollTo(0, 0);
        },
        (error) => {
          this.carregando = false;
          this.message = error;
          this.typeMessage = 'danger';
          this.messageCarregando = null;
          window.scrollTo(0, 0);
        }
      );
  }

  selecionarNaturezaPessoa(event) {
    if (event.target.value === "CPF") {
      this.plano.FichaCredito.Pretendente.Cidade = "";
      this.plano.FichaCredito.Pretendente.UF = "";
    }
    if (event.target.value === "CNPJ") {
      this.plano.FichaCredito.Pretendente.LocalResidencia = "";
      this.plano.FichaCredito.Pretendente.UFResidencia = "";
      this.plano.FichaCredito.Pretendente.LocalTrabalho = "";
      this.plano.FichaCredito.Pretendente.UFTrabalho = "";
      this.plano.FichaCredito.Pretendente.Naturalidade = "";
    }
  }

  processarTelefones() {

    if (this.telefone1 && this.telefone1.trim() !== "") {
      const clearValue = this.clearMask(this.telefone1);
      this.plano.FichaCredito.Pretendente.DDD1 = clearValue.substr(0, 2);
      this.plano.FichaCredito.Pretendente.Telefone1 = clearValue.substr(2);
    }

    if (this.telefone2 && this.telefone2.trim() !== "") {
      const clearValue = this.clearMask(this.telefone2);
      this.plano.FichaCredito.Pretendente.DDD2 = clearValue.substr(0, 2);
      this.plano.FichaCredito.Pretendente.Telefone2 = clearValue.substr(2);
    }

    // let pretendenteTelefonesFixos,
    //   pretendenteTelefonesCelulares,
    //   pretendenteContatos;

    // if (this.telefonesFixos) {
    //   pretendenteTelefonesFixos = this.telefonesFixos.map(el => {
    //     const clearValue = this.clearMask(el.telefone);
    //     const obj = {
    //       DDD: clearValue.substr(0, 2),
    //       Numero: clearValue.substr(2)
    //     };
    //     return obj;
    //   });
    // }
    // if (this.telefonesCelulares) {
    //   pretendenteTelefonesCelulares = this.telefonesCelulares.map(el => {
    //     const clearValue = this.clearMask(el.telefone);
    //     const obj = {
    //       DDD: clearValue.substr(0, 2),
    //       Numero: clearValue.substr(2)
    //     };
    //     return obj;
    //   });
    // }

    // pretendenteContatos = pretendenteTelefonesFixos.concat(
    //   pretendenteTelefonesCelulares
    // );

    // this.plano.FichaCredito.Pretendente.Contatos = pretendenteContatos;
  }

  adicionarCarrinho(plano: any) {
    this.carrinhoService.adicionarItem(plano);
    this.router.navigate(["/carrinho"]);
  }
}
