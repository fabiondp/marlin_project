import { DadosImovel } from './../../autogestao/imoveis/salvar-imovel/salvar-dados-imovel/dados-imovel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../../services/auth.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Renderer,
  NgZone
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { FileHolder } from '../../modules/image-upload/image-upload.component';
import { } from '@types/googlemaps';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { AnuncioService } from '../../services/anuncio.service';
import { MessageService } from '../../services/message.service';
import { UsuarioService } from '../../services/usuario.service';
import { Endereco } from '../../shared/input-busca-cep/endereco';
import { resource } from 'selenium-webdriver/http';
import { SalvarImovelService } from '../../autogestao/imoveis/salvar-imovel/salvar-imovel.service';

declare const google: any
//declare var google: any;
import * as moment from 'moment';
import { conformToMask } from 'angular2-text-mask';

@Component({
  selector: 'app-salvar-anuncio',
  templateUrl: './salvar-anuncio.component.html',
  styleUrls: ['./salvar-anuncio.component.scss']
})
export class SalvarAnuncioComponent implements OnInit, AfterViewInit {
  @ViewChild('localizacaoAtual')
  localizacaoAtual;
  endereco = new Endereco();

  planoAnuncioEscolhido: any;
  planos: any[];
  imoveis: any[];
  dadosImovelSelecionado: DadosImovel;

  enviandoFormulario: boolean;

  public address: any;
  public typesOptions: string[];
  public localizacao: any = '';
  public options = {
    type: 'address',
    componentRestrictions: { country: 'BR' }
  };
  reaproveitarImovel = false;

  typeMessage = null;
  message = null;
  timeMessage = null;
  messageArray = null;

  tipoImovelSelecionado = false;
  planoSelecionado = false;
  imovelSelecionado = false;
  exibirBlocoEndereco = false;
  disabledInput = false;
  tiposImovel = null;
  formTypeEdit = false;
  carregando = true;
  carregandoPlanos = true;
  carregandoImoveis = true;
  novoNumero: any = '';
  arrayImages = [];
  arrayImagesAtualizado = [];
  fotosAnuncio = [];
  totalFotosUpload = 20;

  locacaoFormatado = '';
  condominioFormatado = '';
  IPTUFormatado = '';

  bloquearEdicaoDeEndereco = false;

  geo;
  geoInput;

  anuncio = {
    Uid: null,
    CodigoImovel: '',
    Descricao: '',
    ValorLocacao: '',
    ValorCondominio: null,
    ValorIPTU: null,
    TemSeguroFianca: false,
    Logradouro: '',
    Numero: '',
    Bloco: '',
    Complemento: '',
    Bairro: '',
    Cidade: '',
    Estado: '',
    CEP: '',
    TelefoneFixo: '',
    TelefoneCelular: '',
    Latitude: null,
    Longitude: null,
    PublicarAnuncio: false,
    Enabled: true,
    ClienteId: null,
    TipoImovel: null,
    Caracteristicas: [],
    Fotos: [],
    Quartos: '',
    Suites: '',
    Banheiros: '',
    AreaConstruida: '',
    Vagas: '',
    PlanoId: null,
    PlanoContratadoId: null,
    Plano: null
  };

  userSettings: any = {
    inputPlaceholderText: 'Digite o endereço completo',
    showRecentSearch: true
  };

  // Variaveis para marcara
  public numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    requireDecimal: true
  });

  public maskCep = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  public masktel = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  public maskcel = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  arrayTooltip: any;

  constructor(
    private anuncioService: AnuncioService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private ngZoneService: NgZone,
    private salvarImovelService: SalvarImovelService
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;

    this.arrayTooltip = {
      0: '<div><p><strong>Dicas para descrição do imóvel:</strong></p><ul><li>Relatar o estado do imóvel e suas qualidades: <br />Ex.: Primeira locação, Mobiliado, Arejado, Sol da manhã e etc.</li><li>Escrever sobre a vizinhança, vias de acesso, pontos de referência e comércios próximos: <br />Ex.: Próximo ao metrô, Bancos, Mercados e etc.</li></ul></div><div><p><strong>Veja um exemplo:</strong></p><p>Apartamento com excelente localização e vista para as montanhas, 5 minutos da estação do BRT, próximo a grande rede de mercado, bancos e outros comércios. Sol da manhã, primeira locação, mobiliado, com infraestrutura completa e segurança 24h.</p></div>',
      1: 'Interior do imóvel, espaço que é usado para habitação.',
      2: 'Total de quartos que o imóvel possui, incluindo suítes.',
      3: 'Suíte é um quarto que possui acesso exclusivo ao banheiro.',
      4: 'Quantidade de banheiros existentes no imóvel, incluindo lavabos e banheiros das suítes.',
      5: 'Informar se o imóvel possui vaga na garagem.',
      6: 'Valor mensal informado para locação do imóvel. Faça uma breve pesquisa com imóveis similares ao seu para uma melhor definição deste valor. <br />Ex.: Cidade, bairro, quantidade de quartos e etc.',
      7: 'Valor mensal do condomínio cobrado. É importante confirmar esse valor com a administradora do seu condomínio.',
      8: 'Valor do IPTU. Valor pode ser integral ou dividido em até 12 parcelas. O parcelamento depende da Prefeitura aonde o imóvel está localizado.',
      9: 'Imagens do imóvel. Procure colocar imagens com boa qualidade, que mostrem ambientes claros em diversos ângulos e, se possível, de todos os espaços/cômodos disponíveis.',
      10: 'Use esse botão para publicar direto seu anúncio. A publicação pode ser realizada em até 4 horas após o clique.',
      11: 'Use esse botão para salvar seu anúncio. Ao clicar neste botão, seu anúncio fica salvo; podendo ser editado e/ou publicado posteriormente.',
      12: 'Informar seu número do WhatsApp'
    };

    // this.imovelSelecionado = new DadosImovel();
  }

  clearMask(valuemask: any) {
    if (valuemask !== null || valuemask !== '') {
      return valuemask.replace(/\D/g, '');
    }
    return valuemask;
  }

  clearMaskPreco(valuemask: any) {
    if (valuemask !== null) {
      // valuemask = valuemask.toString();
      // valuemask = valuemask.replace('.', '');
      // valuemask = valuemask.replace(',', '.');
      // valuemask = parseFloat(valuemask);
    }

    return valuemask;
  }

  isDisabled(): boolean {
    return this.disabledInput;
  }

  onChangeTipoImovel() {
    this.tipoImovelSelecionado = true;
  }

  atualizarEndereco(_localizacao: google.maps.GeocoderResult) {
    this.ngZoneService.run(() => {
      if (_localizacao != null) {
        this.localizacao = _localizacao;
        this.exibirBlocoEndereco = true;
        this.anuncio.Logradouro = this.getLogradouro();
        this.anuncio.Bairro = this.getBairro();
        this.anuncio.Cidade = this.getCidade();
        this.anuncio.Estado = this.getEstado();
        this.anuncio.CEP = this.getCep();
        this.anuncio.Latitude = this.localizacao.geometry.location.lat;
        this.anuncio.Longitude = this.localizacao.geometry.location.lng;
      }
    });
  }

  // ngOnInit() {
  //   // this.formTypeEdit = false;
  //   this.planos = [];
  //   this.imoveis = [];
  //   this.carregandoPlanos = true;
  //   this.route.params.subscribe(params => {
  //     this.usuarioService.getPlanosAnunciosDisponiveis().delay(10000).subscribe(
  //       data => {
  //         this.planos = data;
  //         this.carregandoPlanos = false;
  //       },
  //       error => {
  //         if (Array.isArray(error.error)) {
  //           this.message = error.error.map(el => el.Message);
  //           this.typeMessage = 'danger';
  //         }

  //         this.carregandoPlanos = false;
  //       }
  //     );

  //     this.anuncioService.getAllEnumTiposImovel().subscribe(
  //       data => {
  //         this.tiposImovel = data.map(el => el);
  //         this.tiposImovel.splice(0, 1);
  //         this.tiposImovel = this.tiposImovel.sort((a, b) =>
  //           a.Descricao[0].localeCompare(b.Descricao[0])
  //         );

  //         // bloco edicao
  //         if (params.hasOwnProperty('Uid')) {
  //           this.formTypeEdit = true;
  //           this.planoSelecionado = true;
  //           // Carrega valores para o Editar
  //           this.anuncioService.find(params['Uid']).subscribe(
  //             (data: any) => {
  //               this.anuncio = data;
  //               this.mapEndereco(data);

  //               if (this.anuncio.TelefoneCelular) {
  //                 const celularFormatadoMask = conformToMask(
  //                   this.anuncio.TelefoneCelular,
  //                   this.maskcel,
  //                   { guide: false }
  //                 );

  //                 this.anuncio.TelefoneCelular = celularFormatadoMask.conformedValue;
  //               }

  //               if (this.anuncio.TelefoneFixo) {
  //                 const telefoneFormatadoMask = conformToMask(
  //                   this.anuncio.TelefoneFixo,
  //                   this.masktel,
  //                   { guide: false }
  //                 );

  //                 this.anuncio.TelefoneFixo = telefoneFormatadoMask.conformedValue;
  //               }

  //               // this.anuncio.TipoImovel = this.tiposImovel[0].filter(item => {
  //               //   return item.Id === this.anuncio.TipoImovel;
  //               // })[0];

  //               this.exibirBlocoEndereco = true;
  //               this.carregando = false;
  //               this.carregarFotos();
  //             },
  //             error => {
  //               this.message = error.error.map(el => el.Message);
  //               this.typeMessage = 'danger';
  //             }
  //           );
  //         } else {
  //           this.carregando = false;
  //         }
  //       },
  //       error => {
  //         this.message = error.error.map(el => el.Message);
  //         this.typeMessage = 'danger';
  //       }
  //     );

  //     this.salvarImovelService.getAllHomeByClienteId().subscribe(
  //       data => {
  //         this.imoveis = [];

  //         if (data.ImoveisContratos) {
  //           data.ImoveisContratos.forEach(element => {
  //             if (!element.NomeLocatario && element.Logradouro) {
  //               this.imoveis.push(element);
  //             }
  //           });
  //         }

  //         if (data.ImoveisMensais) {
  //           data.ImoveisMensais.forEach(element => {
  //             if (!element.NomeLocatario && element.Logradouro) {
  //               this.imoveis.push(element);
  //             }
  //           });
  //         }

  //         // this.imoveis = data;
  //         // this.imoveis = this.imoveis.concat(
  //         //   data.ImoveisContratos.filter(imoveis => {
  //         //     return !imoveis.NomeLocatario && imoveis.Logradouro;
  //         //   }),
  //         //   data.ImoveisMensais.filter(imoveis => {
  //         //     return !imoveis.NomeLocatario && imoveis.Logradouro;
  //         //   })
  //         // );

  //         this.carregandoImoveis = false;
  //       },
  //       error => {
  //         if (Array.isArray(error.error)) {
  //           this.message = error.error.map(el => el.Message);
  //           this.typeMessage = 'danger';
  //         }
  //         this.carregandoImoveis = false;
  //       }
  //     );
  //   });

  //   this.exibirBlocoEndereco = false;
  // }

  ngOnInit() {
    this.carregarOpcoesDoFormulario();
  }

  carregarOpcoesDoFormulario() {
    this.messageArray = [];
    this.planos = [];
    this.imoveis = [];
    this.carregando = true;
    this.carregandoPlanos = true;
    this.exibirBlocoEndereco = false;

    Observable.forkJoin([
      this.carregarPlanosDeAnuncioDisponiveis(),
      this.carregarOpcoesTipoImovel(),
      this.carregarImoveisAutogestao()
    ]).subscribe(
      ([responsePlanos, responseTipoImovel, responseImoveisAutogestao]) => {
        // bloco edicao
        this.route.params.subscribe(params => {
          if (params.hasOwnProperty('Uid')) {
            this.formTypeEdit = true;
            this.planoSelecionado = true;
            // Carrega valores para o Editar
            this.anuncioService.find(params['Uid']).subscribe(
              (data: any) => {
                this.anuncio = data;
                this.mapEndereco(data);

                if (this.anuncio.TelefoneCelular) {
                  const celularFormatadoMask = conformToMask(
                    this.anuncio.TelefoneCelular,
                    this.maskcel,
                    { guide: false }
                  );

                  this.anuncio.TelefoneCelular = celularFormatadoMask.conformedValue;
                }

                if (this.anuncio.TelefoneFixo) {
                  const telefoneFormatadoMask = conformToMask(
                    this.anuncio.TelefoneFixo,
                    this.masktel,
                    { guide: false }
                  );

                  this.anuncio.TelefoneFixo = telefoneFormatadoMask.conformedValue;
                }

                // this.anuncio.TipoImovel = this.tiposImovel[0].filter(item => {
                //   return item.Id === this.anuncio.TipoImovel;
                // })[0];

                this.exibirBlocoEndereco = true;
                this.carregarFotos();
                this.carregando = false;
              },
              error => {
                this.message = error.error.map(el => el.Message);
                this.typeMessage = 'danger';
                this.carregando = false;
              }
            );
          } else {
            this.carregando = false;
          }
        });
      },
      // ([errorPlanos, errorTipoImovel, errorImoveisAutogestao]) => {
      ([errorPlanos]) => {
        // console.log('errorr', errorPlanos);
        // this.messageArray.push("Ocorreu um erro inesperado ao carregar as opções do formulário! Tente novamente mais tarde!");
        // this.typeMessage = 'danger';

        this.carregando = false;
      }
    );
  }

  carregarPlanosDeAnuncioDisponiveis() {
    return this.usuarioService.getPlanosAnunciosDisponiveis()
      .map(
        (response) => {
          this.planos = response;
          this.carregandoPlanos = false;
          return response;
        }
      )
      .catch(
        (error) => {
          if (Array.isArray(error.error)) {
            this.messageArray = error.error.map(el => el.Message);
            this.typeMessage = 'danger';
          }
          return Observable.throw(error);
        }
      );
  }

  carregarOpcoesTipoImovel() {
    return this.anuncioService.getAllEnumTiposImovel()
      .map((data) => {
        this.tiposImovel = data.map(el => el);
        this.tiposImovel.splice(0, 1);
        this.tiposImovel = this.tiposImovel.sort((a, b) =>
          a.Descricao[0].localeCompare(b.Descricao[0])
        );
        return data;
      })
      .catch(
        (error) => {
          if (Array.isArray(error.error)) {
            this.messageArray = error.error.map(el => el.Message);
            this.typeMessage = 'danger';
          }

          return error;
        }
      )
  }

  carregarImoveisAutogestao() {
    return this.anuncioService.getAllImoveisAutogestao()
      .map((data) => {
        this.imoveis = [];

        if (data.ImoveisContratos) {
          data.ImoveisContratos.forEach(element => {
            if (!element.NomeLocatario && element.Logradouro) {
              this.imoveis.push(element);
            }
          });
        }

        if (data.ImoveisMensais) {
          data.ImoveisMensais.forEach(element => {
            if (!element.NomeLocatario && element.Logradouro) {
              this.imoveis.push(element);
            }
          });
        }

        this.carregandoImoveis = false;
        return data;
      })
      .catch((error) => {
        if (Array.isArray(error.error)) {
          this.messageArray = error.error.map(el => el.Message);
          this.typeMessage = 'danger';
        }
        this.carregandoImoveis = false;

        return error;
      });
  }

  onSubmit(anuncioForm: NgForm) {
    if (anuncioForm.valid) {
      this.anuncio.Caracteristicas = [];

      if (this.anuncio.Quartos) {
        this.anuncio.Caracteristicas.push({
          TipoCaracteristica: 1,
          Conteudo: this.anuncio.Quartos
        });
      }

      if (this.anuncio.Suites) {
        this.anuncio.Caracteristicas.push({
          TipoCaracteristica: 2,
          Conteudo: this.anuncio.Suites
        });
      }
      if (this.anuncio.Vagas) {
        this.anuncio.Caracteristicas.push({
          TipoCaracteristica: 3,
          Conteudo: this.anuncio.Vagas
        });
      }
      if (this.anuncio.AreaConstruida) {
        this.anuncio.Caracteristicas.push({
          TipoCaracteristica: 4,
          Conteudo: this.anuncio.AreaConstruida
        });
      }

      if (this.anuncio.Banheiros) {
        this.anuncio.Caracteristicas.push({
          TipoCaracteristica: 5,
          Conteudo: this.anuncio.Banheiros
        });
      }

      // this.anuncio.TipoImovel = this.anuncio.TipoImovel.Id;

      this.anuncio.TelefoneCelular = this.clearMask(
        this.anuncio.TelefoneCelular
      );

      this.anuncio.TelefoneFixo = this.clearMask(this.anuncio.TelefoneFixo);

      this.anuncio.ValorLocacao = this.clearMaskPreco(
        this.anuncio.ValorLocacao
      );

      this.anuncio.ValorCondominio = this.clearMaskPreco(
        this.anuncio.ValorCondominio
      );

      this.anuncio.ValorIPTU = this.clearMaskPreco(this.anuncio.ValorIPTU);

      this.enviarFotos();

      this.carregando = true;
      window.scrollTo(0, 0);

      this.anuncioService.save(this.anuncio).subscribe(
        () => {
          this.router.navigate(['/anuncios']);
          if (!this.formTypeEdit) {
            this.messageService.message = ['Anúncio salvo com sucesso'];
            this.messageService.typeMessage = 'success';
            this.messageService.timeMessage = 4000;
          } else {
            this.messageService.message = ['Anúncio alterado com sucesso'];
            this.messageService.typeMessage = 'success';
            this.messageService.timeMessage = 4000;
          }
          this.carregando = false;

          window.scrollTo(0, 0);
        },
        error => {
          this.mapCelular();
          this.mapTelefoneFixo();

          if (Array.isArray(error.error)) {
            this.messageArray = error.error.map(el => el.Message);
          } else if (typeof error.error === 'object') {
            this.message = error.error.Message;
          } else {
            this.message = 'Erro inesperado';
          }
          this.typeMessage = 'danger';
          this.carregando = false;
          window.scrollTo(0, 0);
          // this.anuncio.TipoImovel = this.tiposImovel.find(item => {
          //   return item.Id === this.anuncio.TipoImovel;
          // });
        }
      );
    }
  }

  onPublish(anuncioForm: NgForm) {
    this.anuncio.PublicarAnuncio = true;
    this.onSubmit(anuncioForm);
  }

  mapCelular() {
    if (this.anuncio.TelefoneCelular) {
      const celularFormatadoMask = conformToMask(
        this.anuncio.TelefoneCelular,
        this.maskcel,
        { guide: false }
      );

      this.anuncio.TelefoneCelular = celularFormatadoMask.conformedValue;
    }
  }

  mapTelefoneFixo() {
    if (this.anuncio.TelefoneFixo) {
      const telefoneFormatadoMask = conformToMask(
        this.anuncio.TelefoneFixo,
        this.masktel,
        { guide: false }
      );

      this.anuncio.TelefoneFixo = telefoneFormatadoMask.conformedValue;
    }
  }

  // #region UPLOAD DE FOTOS

  onUploadFinished(file: FileHolder) { }

  onRemoved(file: FileHolder) { }

  onUploadStateChanged(state: boolean) { }

  onUpdateArray(list: FileHolder[]) {
    this.arrayImages = list.map(function (file) {
      const imageSrc: any = file.src.split(',')[1];
      const fileName: any = file.file.name;
      const fileType: any = file.file.type;
      const fileSize: any = file.file.size;
      return {
        ArquivoB64: imageSrc,
        NomeArquivo: fileName,
        ContentType: fileType,
        Length: fileSize,
        Uid: file.uid
      };
    });
  }
  // #endregion

  // Carregar as fotos dos anuncios para edição
  carregarFotos() {
    if (this.anuncio.Fotos !== null) {
      // Variavel carregar as fotos para usar no editar
      this.fotosAnuncio = this.anuncio.Fotos.map(item => {
        return {
          filename: item.NomeArquivo,
          url: 'data:image/jpg;base64,' + item.ArquivoB64,
          uid: item.Uid
        };
      });
    }
  }

  enviarFotos() {
    this.anuncio.Fotos = this.arrayImages;
  }

  // #region AUTOCOMPLETE ENDEREÇO

  ngAfterViewInit() { }

  // Observador de geolocalização
  /*
  onAppend = function(geo) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        const nodeUl = mutation.addedNodes[0]
          ? mutation.addedNodes[0].attributes[1].nodeValue
          : '';
        // Verifica se nodeUl é true e faz uma série de modificações no DOM.
        if (nodeUl) {
          const nodeAnchor = geo.querySelector(
            '.custom-autocomplete__dropdown > .currentlocation > a'
          );
          const nodeIcon = geo.querySelector(
            '.custom-autocomplete__dropdown > .currentlocation > a > i'
          );
          const nodeSpan1 = geo.querySelector(
            '.heading.heading-recent > span:nth-of-type(1)'
          );
          const nodeSpan2 = geo.querySelector(
            '.heading.heading-recent > .line.line-location'
          );
          nodeAnchor.textContent = 'Usar Localização Atual';
          nodeAnchor.appendChild(nodeIcon);
          nodeSpan1.textContent = 'Localizações';
          nodeSpan2.style.cssText =
            'left: 117px; top: 16px; width: calc(100% - 120px);';
        }
      });
    });

    observer.observe(geo, { childList: true });
  };
*/
  getLogradouro(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const logradouro = this.localizacao.address_components.filter(function (
        i
      ) {
        return (
          i.types.filter(function (t) {
            return t === 'route';
          }).length > 0
        );
      });
      if (logradouro.length > 0) {
        return logradouro[0].long_name;
      }
    }
    return null;
  }

  getNumero(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const numero = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === 'street_number';
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
            return t === 'postal_code';
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
            return t === 'sublocality_level_1';
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
            return t === 'administrative_area_level_2';
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
            return t === 'administrative_area_level_1';
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
    this.disabledInput = true;
    this.anuncio.Numero = this.getNumero();
    this.anuncio.Logradouro = this.getLogradouro();
    this.anuncio.Bairro = this.getBairro();
    this.anuncio.Cidade = this.getCidade();
    this.anuncio.Estado = this.getEstado();
    this.anuncio.CEP = this.getCep();
    this.anuncio.Latitude = this.localizacao.geometry.location.lat;
    this.anuncio.Longitude = this.localizacao.geometry.location.lng;
  }
  // #endregion

  selecionarPlano() {
    this.planoSelecionado = true;
    this.planoAnuncioEscolhido = this.anuncio.Plano.PlanoContratadoId;
    this.anuncio.PlanoContratadoId = this.planoAnuncioEscolhido;
    this.enviarDadosImovelSelecionado();
  }

  enviarDadosImovelSelecionado() {
    if (this.reaproveitarImovel) {
      this.endereco = this.dadosImovelSelecionado[0];
      this.enderecoChange(this.endereco);
      this.anuncio.ValorCondominio = this.dadosImovelSelecionado[0].ValorCondominio;
      this.anuncio.ValorIPTU = this.dadosImovelSelecionado[0].ValorIPTU;
      this.anuncio.AreaConstruida =
        this.dadosImovelSelecionado[0].Area === 0
          ? null
          : this.dadosImovelSelecionado[0].Area;
      this.anuncio.Vagas =
        this.dadosImovelSelecionado[0].Vagas === 0
          ? null
          : this.dadosImovelSelecionado[0].Vagas;
      this.anuncio.ValorLocacao =
        this.dadosImovelSelecionado[0].ValorLocacao === 0
          ? null
          : this.dadosImovelSelecionado[0].ValorLocacao;
    }
  }

  selecionarImovel() {
    this.imovelSelecionado = true;
  }

  enderecoChange(e: any) {
    if (e !== null && e !== undefined) {
      this.anuncio.Numero = e.Numero;
      this.anuncio.Logradouro = e.Logradouro;
      this.anuncio.Bairro = e.Bairro;
      this.anuncio.Cidade = e.Cidade;
      this.anuncio.Estado = e.Estado;
      this.anuncio.CEP = e.CEP;
      this.anuncio.Complemento = e.Complemento;
      this.getLocalizacao();
    }
  }

  mapEndereco(data) {
    this.endereco = Endereco.map(data);
    if (this.endereco !== null || this.endereco !== undefined) {
      this.bloquearEdicaoDeEndereco = true;
    }
  }

  getLocalizacao() {
    this.localizacao = {};
    this.anuncio.Latitude = null;
    this.anuncio.Longitude = null;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      {
        address: `${this.endereco.Logradouro} ${this.endereco.Numero} ${
          this.endereco.Bairro
          } ${this.endereco.Cidade} ${this.endereco.Estado}`
      },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.ngZoneService.run(() => {
            this.localizacao = results[0];
            this.anuncio.Latitude = results[0].geometry.location.lat();
            this.anuncio.Longitude = results[0].geometry.location.lng();
          });
        }
      }
    );
  }

  inicioVigenciaDoPlanoEscolhidoFutura(plano) {
    if (plano && plano.DataInicioVigencia) {
      const dataInicioVigencia = moment(plano.DataInicioVigencia);
      dataInicioVigencia
        .hours(0)
        .minutes(0)
        .seconds(0);
      // dataInicioVigencia
      const dataAtual = moment();
      dataAtual
        .hours(0)
        .minutes(0)
        .seconds(0);

      return dataInicioVigencia > dataAtual;
    }
    return false;
  }

  vincularAoPlanoVigente() { }
}
