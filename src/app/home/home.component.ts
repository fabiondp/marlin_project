import { AuthService } from '../services/auth.service';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../services/usuario.service';
import { MessageService } from '../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef, ViewChildren, HostListener } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { CarrinhoService } from '../carrinho/carrinho/carrinho.service';
import { ModalComponent } from '../bootstrap/modal/modal.component';
import { environment } from 'environments/environment';
import { SimulacaoService } from '../simulacao-valor-plano/simulacao.service';

// import { JqueryService } from "../services/jquery.service";

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('modal1') modalFaleConosco: ModalComponent;
    @ViewChild('modalValidacaoCarrinho') modalValidacaoCarrinho: ModalComponent;
    @ViewChild('modalErrorInesperado') modalErrorInesperado: ModalComponent;
    @ViewChildren('anuncios') anuncios: any;

    @HostListener('window:resize', ['$event']) onWindowResize() {
      if(!this.popoverTimeoutID) {
        this.removeAllPopoversBindings();

        // É necessário dar um delay, pois destruir popovers é assíncrono, pode levar um tempo
        this.popoverTimeoutID = window.setTimeout(() => {
          this.bindPopoversBasedOnWindowWidth();

          window.clearTimeout(this.popoverTimeoutID);
          this.popoverTimeoutID = null;
        }, 500)
      }
    }

    @HostListener('document:click', ['$event']) handleClickOutsideOfAnuncioCards(event: MouseEvent) {
      if(this.hasAnuncios()) {
        let clickedOutside: boolean = true;

        this.anuncios.forEach((anuncio: ElementRef) => {
          if((anuncio.nativeElement) && (anuncio.nativeElement.contains(event.target))) {
            clickedOutside = false;
          }
        });

        if(clickedOutside) {
          this.anuncios.forEach((anuncio: ElementRef) => {
            if((anuncio.nativeElement) && ($(anuncio.nativeElement).next('div.popover:visible').length)) {
              $(anuncio.nativeElement).popover('hide');
            }
          })
        }
      }
    }

    private popoverTimeoutID = null;

    enableAnaliseDeCredito: boolean;
    enableAutoGestaoDeLocacao: boolean;
    enableAluguelTemporada: boolean;
    mensagemEnviada = false;
    produtoAnuncio: any;
    produtoAnalise: any;
    produtoAutogestao: any;
    carregando = true;
    carregandoAnalise = true;
    carregandoAutogestao = true;
    message = null;
    typeMessage = null;
    timeMessage = null;

    messageAnalise = null;
    typeMessageAnalise = null;
    timeMessageAnalise = null;

    messageAutogestao = null;
    typeMessageAutogestao = null;
    timeMessageAutogetao = null;

    mensagemDegustacao = null;

    faleConosco = {
        nome: this.authService.user.nome,
        email: this.authService.user.email,
        assunto: null,
        mensagem: ''
    };

    messageFaleConosco = null;
    typeMessageFaleConosco = null;
    timeMessageFaleConosco = null;

    produtoAnuncioCarregado = false;
    produtoAnaliseCarregado = false;


    constructor(
        private produtoService: ProdutoService,
        private carrinhoService: CarrinhoService,
        private router: Router,
        private messageService: MessageService,
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private simulacaoService: SimulacaoService
    ) {
        this.messageFaleConosco = this.messageService.message;
        this.typeMessageFaleConosco = this.messageService.typeMessage;
        this.timeMessageFaleConosco = this.messageService.timeMessage;
        this.enableAnaliseDeCredito = environment.enableAnaliseDeCredito;
        this.enableAutoGestaoDeLocacao = environment.enableAutoGestaoDeLocacao;
        // this.enableAutoGestaoDeLocacao = false;
        // this.enableAluguelTemporada = false;
    }

    ngOnInit() {
        this.mensagemEnviada = false;
        $(document).ready(() => { });

        this.produtoService.getAllProdutoAnuncio().subscribe(
            data => {
                this.produtoAnuncio = data;
                this.carregando = false;

                this.produtoAnuncio.Planos.forEach(plano => {
                    plano.Degustacao =
                        plano.TiposPromocao &&
                        plano.TiposPromocao.some(i => i.Codigo === 1);
                });

                // Adicionando texto MOCADO de gratuidade
                this.produtoAnuncio.Planos[0].mensagemDeGratuidade = "1 mês de plataforma de gestão grátis*";
                this.produtoAnuncio.Planos[1].mensagemDeGratuidade = "3 meses de plataforma de gestão grátis*";
                this.produtoAnuncio.Planos[2].mensagemDeGratuidade = "6 meses de plataforma de gestão grátis*";

                if (this.produtoAnuncio.PlanoDegustacao && !this.carrinhoService.planoDegustacaoAnuncio) {
                    this.produtoAnuncio.PlanoDegustacao.PlanoUid = this.produtoAnuncio.PlanoDegustacao.Uid;
                    this.carrinhoService.planoDegustacaoAnuncio = this.produtoAnuncio.PlanoDegustacao;
                } else if (this.produtoAnuncio.PlanoDegustacao && this.carrinhoService.planoDegustacaoAnuncio) {
                    this.produtoAnuncio.PlanoDegustacao.PlanoUid = this.produtoAnuncio.PlanoDegustacao.Uid;
                    this.produtoAnuncio.PlanoDegustacao.PlanoOrigem = this.carrinhoService.planoDegustacaoAnuncio.PlanoOrigem;
                    this.produtoAnuncio.PlanoDegustacao.PlanoOrigemUid = this.carrinhoService.planoDegustacaoAnuncio.PlanoOrigemUid;
                    this.carrinhoService.planoDegustacaoAnuncio = this.produtoAnuncio.PlanoDegustacao;
                }

                this.produtoAnuncioCarregado = true;
                this.ativarPrerender();
            },
            error => {
                this.message = Array.isArray(error)
                    ? error.map(el => el.Message)
                    : [error];
                this.typeMessage = 'danger';
                this.carregando = false;
            }
        );

        if (this.enableAnaliseDeCredito) {
            this.produtoService.getAllProdutoAnalise().subscribe(
                data => {
                    this.produtoAnalise = data;
                    this.carregandoAnalise = false;
                    this.produtoAnaliseCarregado = true;
                    this.ativarPrerender();
                },
                error => {
                    this.messageAnalise = Array.isArray(error)
                        ? error.map(el => el.Message)
                        : [error];
                    this.typeMessageAnalise = 'danger';
                    this.carregandoAnalise = false;
                }
            );
        }

        if (this.enableAutoGestaoDeLocacao) {
            this.produtoService.getAllProdutoAutogestao().subscribe(
                data => {
                    this.produtoAutogestao = data;
                    this.carregandoAutogestao = false;

                    this.produtoAutogestao.Planos.forEach(plano => {
                        plano.Degustacao =
                            plano.TiposPromocao &&
                            plano.TiposPromocao.some(i => i.Codigo === 1);
                    });
                },
                error => {
                    this.messageAutogestao = Array.isArray(error)
                        ? error.map(el => el.Message)
                        : [error];
                    this.typeMessageAutogestao = 'danger';
                    this.carregandoAutogestao = false;
                }
            );
        }

        this.route.params.subscribe(params => {
            if (params['release'] && params['release'] === '1') {
                this.enableAnaliseDeCredito = false;
                this.enableAutoGestaoDeLocacao = false;
                this.enableAluguelTemporada = false;
            }
        });
    }

    ngOnDestroy() {
      // this.messageService.message = '';
      // this.messageService.typeMessage = '';
      // this.messageService.timeMessage = '';
    }

    ngAfterViewInit() {
      this.removeAllPopoversBindings();
      this.setPopoversContent();        
      this.bindPopoversBasedOnWindowWidth();

      this.anuncios.changes.subscribe(() => {
        this.removeAllPopoversBindings();
        this.setPopoversContent();        
        this.bindPopoversBasedOnWindowWidth();
      });
    }
    
    removeAllPopoversBindings() {
      if(this.hasAnuncios()) {
        this.anuncios.forEach((anuncio: ElementRef) => {
          if(anuncio.nativeElement)
            $(anuncio.nativeElement).popover('destroy');
            $(anuncio.nativeElement).unbind();
        });
      }
    }

    setPopoversContent() {
      this.anuncios.forEach((anuncio: ElementRef) => {
        (anuncio.nativeElement as HTMLElement).setAttribute('data-content', `
          <ul>
            <li>
              MAIS DE 32 MILHÕES DE VISUALIZAÇÕES POR MÊS
            </li>

            <li>
              CONTATO DIRETO COM O INTERESSADO NO IMÓVEL
            </li>

            <li>
              RELATÓRIO SEMANAL DOS ANÚNCIOS
            </li>
          </ul>
        `);          
      });
    }

    bindPopoversBasedOnWindowWidth() {
      if(window.innerWidth <= 800) {
        this.bindPopoversForMobile();
      }
      else {
        this.bindPopoverForDesktop();
      }
    }

    hideAllPopovers() {
      if(this.hasAnuncios()) {
        for(let i = 0; i < this.anuncios.length; i++) {
          if(this.anuncios[i] && this.anuncios[i].nativeElement) {
            $(this.anuncios[i].nativeElement).popover('hide');
          }
        }
      }
    }

    bindPopoverForDesktop() {
      if(this.hasAnuncios()) {
        this.anuncios.forEach((anuncio: ElementRef) => {
          if(anuncio.nativeElement) {
            $(anuncio.nativeElement).popover({
              placement: 'top',
              trigger: 'hover',
            });
          }
        });
      }
    }

    bindPopoversForMobile() {
      this.anuncios.forEach((anuncio: ElementRef, index: number) => {
        if(anuncio.nativeElement) {
          $(anuncio.nativeElement).popover({
            placement: 'top',
            trigger: 'manual',
            delay: {
              show: 500,
            },
          }).on('click', (e: Event)=> {
            let shouldShow = true;

            this.anuncios.forEach((anuncioInner: ElementRef) => {
              if($(anuncioInner.nativeElement).next('div.popover:visible').length) {
                $(anuncioInner.nativeElement).popover('hide');

                if(anuncioInner.nativeElement === anuncio.nativeElement) {
                  shouldShow = false;
                }
              }
            })

            if(shouldShow)
              $(anuncio.nativeElement).popover('show');
          });
        };
      });
    }

    hasAnuncios(): boolean {
      return ((this.anuncios) && (this.anuncios.length > 0));
    }

    adicionarCarrinho(plano: any, e) {
        e.preventDefault();

        if (plano.Degustacao && this.carrinhoService.temPlanoDegustacao()) {
            this.mensagemDegustacao = 'Você só pode adquirir um Plano de Degustação.';

            this.modalValidacaoCarrinho.open();
        } 
        // else if (plano.Degustacao && this.authService.check) {
        //     this.usuarioService.verificarDegustacao().subscribe(
        //         (response) => {
        //             if (response === true) {
        //                 this.mensagemDegustacao = 'Você já possui um Plano de Degustação e só pode possuir um.';
        //                 this.modalValidacaoCarrinho.open();
        //             } else if (response === false) {
        //                 this.carrinhoService.adicionarItem(plano);
        //                 this.router.navigate(['/carrinho']);
        //             }
        //         },
        //         (error) => {
        //             this.modalErrorInesperado.open();
        //         }
        //     );
        // } 
        else {
            this.carrinhoService.adicionarItem(plano);
            this.router.navigate(['/carrinho']);
        }
    }

    simularValorPlano(plano: any) {
        this.simulacaoService.simularPlano(plano);
        this.router.navigate(['/simulacao-valor-plano', plano.Uid]);
    }

    abrirModalFaleConosco() {
        this.modalFaleConosco.open();
        (<any>window).ga('send', 'event', {
            eventCategory: 'click',
            eventLabel: 'faleconosco',
            eventAction: 'abrir modal faleconosco'
        });
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

    degustarAnuncio(planoOrigem, e) {
        (<any>window).ga('send', 'event', {
            eventCategory: 'click',
            eventLabel: 'degustacao',
            eventAction: 'adicionar degustação ao carrinho'
        });

        e.preventDefault();
        this.carrinhoService.degustar(planoOrigem);
        this.router.navigate(['/carrinho']);

    }

    fecharMensagem() {
        this.modalFaleConosco.close();
        setTimeout(() => {
            this.mensagemEnviada = false;
        }, 1000);
    }

    irParaPlanosDeAnuncios(idElement) {
        const elementt = document.querySelector('#' + idElement);

        $('html, body').animate(
            { scrollTop: $(elementt).offset().top - 90 },
            800
        );
    }

    ativarPrerender() {
        if (this.produtoAnuncioCarregado && this.produtoAnaliseCarregado) {
            window["prerenderReady"] = true;
        }
    }
}
