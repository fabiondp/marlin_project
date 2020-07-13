import { AlterarPlanoService } from './meus-planos/alterar-plano.service';

import { LancamentoPrestacaoContasComponent } from './autogestao/financeiro/prestacao-contas/lancamento-prestacao-contas/lancamento-prestacao-contas.component';
import { CobrancasService } from './autogestao/cobrancas/cobrancas.service';
import { AlertaConvenioBancarioService } from './autogestao/alerta-convenio-bancario/alerta-convenio-bancario.service';
import { HistoricoContratoService } from './autogestao/imoveis/historico-contrato/historico-contrato.service';
import { HistoricoProprietarioService } from './autogestao/imoveis/historico-proprietario/historico-proprietario.service';
// tslint:disable-next-line:max-line-length
import { SalvarLocatarioFiadorGarantiaService } from './autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/salvar-locatario-fiador-garantia.service';

import { JoyrideModule } from 'ngx-joyride';

import { ModalTokenExpiradoComponent } from './autenticacao/modal-token-expirado/modal-token-expirado.component';
import { DetalheImovelService } from './autogestao/imoveis/detalhe-imovel/detalhe-imovel.service';

import { InputBuscaCepService } from './shared/input-busca-cep/input-busca-cep.service';
// import { CollapseModule, BsDatepickerModule, setTheme } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { setTheme } from 'ngx-bootstrap/utils';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { AgmCoreModule, MapsAPILoader, NoOpMapsAPILoader } from '@agm/core';
import { SlickModule } from 'ngx-slick';
import { ImageUploadModule } from './modules/image-upload/image-upload.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AnuncioService } from './services/anuncio.service';

import { MessageService } from './services/message.service';

import { UsuarioService } from './services/usuario.service';
import { ImageService } from './modules/image-upload/image.service';

import { ButtonComponent } from './bootstrap/button/button.component';

import { ModalComponent } from './bootstrap/modal/modal.component';
import { AlertComponent } from './bootstrap/alert/alert.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './bootstrap/navbar/navbar.component';
import { FooterComponent } from './bootstrap/footer/footer.component';
import { AnunciosComponent } from './anuncio/anuncios/anuncios.component';
import { DetalheAnuncioComponent } from './anuncio/detalhe-anuncio/detalhe-anuncio.component';

import { SalvarAnuncioComponent } from './anuncio/salvar-anuncio/salvar-anuncio.component';
import { LoadingComponent } from './bootstrap/loading/loading.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { InputTelefoneComponent } from './shared/input-telefone/input-telefone.component';
import { LoginComponent } from './autenticacao/login/login.component';
import { RedefinirSenhaComponent } from './autenticacao/redefinir-senha/redefinir-senha.component';
import { SalvarUsuarioComponent } from './usuario/salvar-usuario/salvar-usuario.component';

import { AuthService } from './services/auth.service';
import { JwtTokenService } from './services/jwt-token.service';
import { DefaultRequestOptionsService } from './services/default-request-options.service';
import { AuthGuardRouterService } from './services/auth-guard-router.service';
import { CarrinhoService } from './carrinho/carrinho/carrinho.service';

import { MeusPlanosComponent } from './meus-planos/meus-planos.component';
import { LembrarSenhaComponent } from './autenticacao/lembrar-senha/lembrar-senha.component';
import { InputBuscaCepComponent } from './shared/input-busca-cep/input-busca-cep.component';

import { ProdutoService } from './services/produto.service';
import { LocalStorageService } from './services/local-storage.service';

import { ContadorCaracteresPipe } from './shared/contador-caracteres.pipe';

import { TokenInterceptor } from './autenticacao/token.interceptor';
import { RelatorioAnuncioComponent } from './anuncio/relatorio-anuncio/relatorio-anuncio.component';
import { GlyphComponent } from './bootstrap/glyph/glyph.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-br');

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt', ptBrLocale);
defineLocale('pt-br', ptBrLocale);
import { AnaliseCompletaComponent } from './analise-credito/analise-completa/analise-completa.component';
import { AnaliseCompletaService } from './services/analise-completa.service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TermosCondicoesUsoComponent } from './termos-condicoes-uso/termos-condicoes-uso.component';
import { TermosCondicoesUsoTextoComponent } from './termos-condicoes-uso-texto/termos-condicoes-uso-texto.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';
import { FaqComponent } from './faq/faq.component';
import { DicasSegurancaComponent } from './dicas-seguranca/dicas-seguranca.component';
import { SimulacaoValorPlanoComponent } from './simulacao-valor-plano/simulacao-valor-plano.component';
import { SimulacaoService } from './simulacao-valor-plano/simulacao.service';
import { LocacaoService } from './services/locacao.service';
import { SafeHtmlPipe } from './shared/safe-html.pipe';
import { CarrinhoComponent } from './carrinho/carrinho/carrinho.component';
// import { CookieService } from '../../node_modules/angular2-cookie/services/cookies.service';
// import { CookieOptions, BaseCookieOptions } from '../../node_modules/angular2-cookie/services/base-cookie-options';
// import { BaseCookieOptions, CookieService, CookieOptions } from 'angular2-cookie/core';
import { CookieModule } from 'ngx-cookie';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SalvarImovelComponent } from './autogestao/imoveis/salvar-imovel/salvar-imovel.component';
import { ImoveisComponent } from './autogestao/imoveis/imoveis.component';

import { DetalheImovelComponent } from './autogestao/imoveis/detalhe-imovel/detalhe-imovel.component';
import { SalvarImovelService } from './autogestao/imoveis/salvar-imovel/salvar-imovel.service';
import { ImoveisService } from './autogestao/imoveis/imoveis.service';
import { SalvarDadosImovelComponent } from './autogestao/imoveis/salvar-imovel/salvar-dados-imovel/salvar-dados-imovel.component';
// tslint:disable-next-line:max-line-length
import { SalvarDadosProprietarioComponent } from './autogestao/imoveis/salvar-imovel/salvar-dados-proprietario/salvar-dados-proprietario.component';
import { VisualizarDadosImovelComponent } from './autogestao/imoveis/detalhe-imovel/visualizar-dados-imovel/visualizar-dados-imovel.component';
// tslint:disable-next-line:max-line-length
import { VisualizarDadosProprietarioComponent } from './autogestao/imoveis/detalhe-imovel/visualizar-dados-proprietario/visualizar-dados-proprietario.component';

// tslint:disable-next-line:max-line-length
import { SalvarDadosProprietarioService } from './autogestao/imoveis/salvar-imovel/salvar-dados-proprietario/salvar-dados-proprietario.service';

// tslint:disable-next-line:max-line-length
import { VisualizarDadosContratoComponent } from './autogestao/imoveis/detalhe-imovel/visualizar-dados-contrato/visualizar-dados-contrato.component';

import { SessionStorageService } from 'app/services/session-storage.service';
// tslint:disable-next-line:max-line-length
import { VisualizarDadosLocatarioComponent } from './autogestao/imoveis/detalhe-imovel/visualizar-dados-locatario/visualizar-dados-locatario.component';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { CustomStepperComponent } from './shared/custom-stepper/custom-stepper.component';
import { SalvarContratoComponent } from './autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-contrato.component';
import { FinanceiroComponent } from './autogestao/financeiro/financeiro.component';

import { BoletoComponent } from './autogestao/boleto/boleto.component';
import { PagamentoComponent } from './carrinho/pagamento/pagamento.component';
import { FinalizacaoComponent } from './carrinho/finalizacao/finalizacao.component';

import { PedidoService } from 'app/carrinho/pedido.service';
// tslint:disable-next-line:max-line-length

import { SalvarDadosContratoComponent } from 'app/autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-dados-contrato/salvar-dados-contrato.component';
// tslint:disable-next-line:max-line-length

import { SalvarDadosContratoService } from 'app/autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-dados-contrato/salvar-dados-contrato.service';
// tslint:disable-next-line:max-line-length
import { SalvarLocatarioFiadorGarantiaComponent } from './autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/salvar-locatario-fiador-garantia.component';

import { HistoricoBoletosComponent } from './autogestao/boleto/historico-boletos/historico-boletos.component';
import { BoletosGeradosComponent } from './autogestao/boleto/boletos-gerados/boletos-gerados.component';
import { BoletosService } from './autogestao/boleto/boletos.service';
import { BoletoPorImovelComponent } from './autogestao/boleto/boleto-por-imovel/boleto-por-imovel.component';
import { AnaliseCreditoService } from 'app/analise-credito/analise-credito.service';
import { HistoricoProprietarioComponent } from './autogestao/imoveis/historico-proprietario/historico-proprietario.component';
// tslint:disable-next-line:max-line-length
import { DetalheProprietarioComponent } from './autogestao/imoveis/historico-proprietario/detalhe-proprietario/detalhe-proprietario.component';
// tslint:disable-next-line:max-line-length
import { SeguroFiancaComponent } from './autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/seguro-fianca/seguro-fianca.component';
import { TituloCapitalizacaoComponent } from './autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/titulo-capitalizacao/titulo-capitalizacao.component';
// tslint:disable-next-line:max-line-length
import { CartaFiancaComponent } from './autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/carta-fianca/carta-fianca.component';
import { CaucaoComponent } from './autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/caucao/caucao.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModeloContratoComponent } from './autogestao/imoveis/modelo-contrato/modelo-contrato.component';
import { ModeloContratoService } from './autogestao/imoveis/modelo-contrato/modelo-contrato.service';
import { HistoricoContratoComponent } from './autogestao/imoveis/historico-contrato/historico-contrato.component';

import { ReajusteAluguelComponent } from './autogestao/reajuste-aluguel/reajuste-aluguel.component';
import { ReajusteAluguelService } from 'app/autogestao/reajuste-aluguel/reajuste-aluguel.service';

import { RelatorioContratoComponent } from './autogestao/imoveis/relatorio-contrato/relatorio-contrato.component';
import { RelatorioContratoService } from './autogestao/imoveis/relatorio-contrato/relatorio-contrato.service';
import { DetalheContratoComponent } from './autogestao/imoveis/historico-contrato/detalhe-contrato/detalhe-contrato.component';
import { RemoveCurrencySymbolPipe } from './shared/remove-currency-symbol.pipe';
import { PoliticaQualidadeComponent } from './politica-qualidade/politica-qualidade.component';
import { TermoContratoAnuncioComponent } from './termo-contrato-anuncio/termo-contrato-anuncio.component';
import { TermoContratoAnaliseComponent } from './termo-contrato-analise/termo-contrato-analise.component';
import { TermoContratoAutogestaoComponent } from './termo-contrato-autogestao/termo-contrato-autogestao.component';
import { VerificarDadosComponent } from './carrinho/verificar-dados/verificar-dados.component';
import { VerificarDadosService } from './carrinho/verificar-dados/verificar-dados.service';
import { FaleconoscoComponent } from './faleconosco/faleconosco.component';
import { LoginAreaExclusivaComponent } from './autenticacao/login-area-exclusiva/login-area-exclusiva.component';
import { AlertaConvenioBancarioComponent } from './autogestao/alerta-convenio-bancario/alerta-convenio-bancario.component';
import { CobrancasComponent } from './autogestao/cobrancas/cobrancas.component';
import { HistoricoCobrancasComponent } from './autogestao/cobrancas/historico-cobrancas/historico-cobrancas.component';
import { DetalheCobrancaComponent } from './autogestao/cobrancas/detalhe-cobranca/detalhe-cobranca.component';
import { LancamentoComponent } from './autogestao/cobrancas/lancamento/lancamento.component';
import { ConvenioBancarioService } from './autogestao/financeiro/convenio-bancario/convenio-bancario.service';
import { SalvarConvenioComponent } from './autogestao/financeiro/convenio-bancario/salvar-convenio/salvar-convenio.component';

import { StatusCobrancaPipe } from './shared/status-cobranca.pipe';
import { StatusBoletoPipe } from './shared/status-boleto.pipe';
import { PaginacaoComponent } from './shared/paginacao/paginacao.component';
import { HistoricoCobrancasFilterService } from './autogestao/cobrancas/historico-cobrancas/historico-cobrancas-filter.service';
import { PrestacaoContasComponent } from './autogestao/financeiro/prestacao-contas/prestacao-contas.component';
import { PrestacaoContasService } from './autogestao/financeiro/prestacao-contas/prestacao-contas.service';
import { PrestacaoContasFilterService } from './autogestao/financeiro/prestacao-contas/prestacao-contas-filter.service';
import { LancamentoFinanceiroComponent } from './autogestao/financeiro/lancamento-financeiro/lancamento-financeiro.component';
import { PrestacaoContasProprietariosComponent } from './autogestao/financeiro/prestacao-contas-proprietario/prestacao-contas-proprietarios.component';
import { PrestacaoContasProprietariosService } from './autogestao/financeiro/prestacao-contas-proprietario/prestacao-contas-proprietarios.service';
import { PrestacaoContasProprietariosFilterService } from './autogestao/financeiro/prestacao-contas-proprietario/prestacao-contas-proprietarios-filter.service';
import { AlterarPlanoAutogestaoComponent } from './meus-planos/alterar-plano-autogestao/alterar-plano-autogestao.component';
import { AdministracaoComponent } from './autogestao/administracao/administracao.component';
import { InformacoesBancariasComponent } from './autogestao/financeiro/informacoes-bancarias/informacoes-bancarias.component';
import { InformacoesBancariasService } from './autogestao/financeiro/informacoes-bancarias/informacoes-bancarias.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DetailInfoPipe } from './shared/detail-info.pipe';
import { DescricaoMesPipe } from './shared/descricao-mes.pipe';
import { CpfcnpjPipe } from './shared/cpfcnpj.pipe';
import { DetailOpcoesPipe } from './shared/detail-opcoes.pipe';
import { SalvarContratoAdministracaoComponent } from './autogestao/imoveis/salvar-imovel/salvar-contrato-administracao/salvar-contrato-administracao.component';
import { VisualizarContratoAdministracaoComponent } from './autogestao/imoveis/detalhe-imovel/visualizar-contrato-administracao/visualizar-contrato-administracao.component';
import { ContratoAdministracaoService } from './autogestao/imoveis/salvar-imovel/salvar-contrato-administracao/contrato-administracao.service';
import { DetailContatoPipe } from './shared/detail-contato.pipe';
import { GarantiaOutrosComponent } from './autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/garantia-outros/garantia-outros.component';
import { DetalhePrestacaoContasComponent } from './autogestao/financeiro/detalhe-prestacao-contas/detalhe-prestacao-contas.component';
import { ModalEditarTaxaAdministracaoComponent } from './autogestao/financeiro/modal-editar-taxa-administracao/modal-editar-taxa-administracao.component';
import { ImprimirPrestacaoContasComponent } from './autogestao/financeiro/imprimir-prestacao-contas/imprimir-prestacao-contas.component';
import { DesativarImoveisAutogestaoComponent } from './meus-planos/desativar-imoveis-autogestao/desativar-imoveis-autogestao.component';
import { LogoutComponent } from './logout/logout.component';
import { DesativarImoveisAutogestaoService } from './meus-planos/desativar-imoveis-autogestao/desativar-imoveis-autogestao.service';

@NgModule({
  declarations: [
    AppComponent,
    GlyphComponent,
    ButtonComponent,
    ModalComponent,
    AlertComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AnunciosComponent,
    SalvarAnuncioComponent,
    LoadingComponent,
    DashboardComponent,
    PageNotFoundComponent,
    InputTelefoneComponent,
    DetalheAnuncioComponent,
    InputTelefoneComponent,
    LoginComponent,
    RedefinirSenhaComponent,
    SalvarUsuarioComponent,
    CarrinhoComponent,
    MeusPlanosComponent,
    LembrarSenhaComponent,
    InputBuscaCepComponent,
    ContadorCaracteresPipe,
    RelatorioAnuncioComponent,
    AnaliseCompletaComponent,
    TermosCondicoesUsoComponent,
    TermosCondicoesUsoTextoComponent,
    PoliticaPrivacidadeComponent,
    FaqComponent,
    DicasSegurancaComponent,
    SimulacaoValorPlanoComponent,
    SafeHtmlPipe,
    SalvarImovelComponent,
    ImoveisComponent,
    DetalheImovelComponent,
    SalvarDadosImovelComponent,
    SalvarDadosProprietarioComponent,
    VisualizarDadosImovelComponent,
    VisualizarDadosProprietarioComponent,
    SalvarDadosContratoComponent,
    VisualizarDadosContratoComponent,
    VisualizarDadosLocatarioComponent,
    CustomStepperComponent,
    SalvarContratoComponent,
    ModalTokenExpiradoComponent,
    FinanceiroComponent,
    SalvarConvenioComponent,
    BoletoComponent,
    PagamentoComponent,
    FinalizacaoComponent,
    SalvarLocatarioFiadorGarantiaComponent,
    HistoricoBoletosComponent,
    BoletosGeradosComponent,
    BoletoPorImovelComponent,
    HistoricoProprietarioComponent,
    DetalheProprietarioComponent,
    SeguroFiancaComponent,
    TituloCapitalizacaoComponent,
    CartaFiancaComponent,
    CaucaoComponent,
    HistoricoContratoComponent,
    ModeloContratoComponent,
    RelatorioContratoComponent,
    ReajusteAluguelComponent,
    DetalheContratoComponent,
    RemoveCurrencySymbolPipe,
    PoliticaQualidadeComponent,
    TermoContratoAnuncioComponent,
    TermoContratoAnaliseComponent,
    TermoContratoAutogestaoComponent,
    VerificarDadosComponent,
    FaleconoscoComponent,
    LoginAreaExclusivaComponent,
    AlertaConvenioBancarioComponent,
    CobrancasComponent,
    HistoricoCobrancasComponent,
    DetalheCobrancaComponent,
    LancamentoComponent,
    LancamentoPrestacaoContasComponent,
    StatusCobrancaPipe,
    StatusBoletoPipe,
    PaginacaoComponent,
    PrestacaoContasComponent,
    PrestacaoContasProprietariosComponent,
    LancamentoFinanceiroComponent,
    AlterarPlanoAutogestaoComponent,
    AdministracaoComponent,
    InformacoesBancariasComponent,
    DetailInfoPipe,
    DescricaoMesPipe,
    CpfcnpjPipe,
    DetailOpcoesPipe,
    DetailContatoPipe,
    SalvarContratoAdministracaoComponent,
    VisualizarContratoAdministracaoComponent,
    GarantiaOutrosComponent,
    DetalhePrestacaoContasComponent,
    ModalEditarTaxaAdministracaoComponent,
    ImprimirPrestacaoContasComponent,
    DesativarImoveisAutogestaoComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    Ng2OrderModule,
    ImageUploadModule,
    TextMaskModule,
    CurrencyMaskModule,
    CdkStepperModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    SlickModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB01CSo75EWpUxtkXLQ07QIFEFYQZGsOvM'
    }),
    ModalModule.forRoot(),
    CookieModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    JoyrideModule.forRoot(),
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    MessageService,
    AnuncioService,
    LocacaoService,
    UsuarioService,
    ProdutoService,
    ImageService,
    LocalStorageService,
    // { provide: CookieOptions, useClass: BaseCookieOptions },
    // CookieService,
    AuthService,
    JwtTokenService,
    DefaultRequestOptionsService,
    AuthGuardRouterService,
    CarrinhoService,
    AnaliseCompletaService,
    SimulacaoService,
    InputBuscaCepService,
    SalvarImovelService,
    ImoveisService,
    DetalheImovelService,
    SalvarDadosProprietarioService,
    SalvarLocatarioFiadorGarantiaService,
    SessionStorageService,
    SalvarDadosContratoService,
    ConvenioBancarioService,
    PedidoService,
    BoletosService,
    AnaliseCreditoService,
    HistoricoProprietarioService,
    ModeloContratoService,
    ReajusteAluguelService,
    RelatorioContratoService,
    HistoricoContratoService,
    VerificarDadosService,
    AlertaConvenioBancarioService,
    CobrancasService,
    PrestacaoContasService,
    PrestacaoContasProprietariosService,
    HistoricoCobrancasFilterService,
    PrestacaoContasFilterService,
    PrestacaoContasProprietariosFilterService,
    AlterarPlanoService,
    InformacoesBancariasService,
    ContratoAdministracaoService,
    DesativarImoveisAutogestaoService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-br'
    },
    {
      provide: MapsAPILoader,
      useClass: NoOpMapsAPILoader
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalTokenExpiradoComponent]
})
export class AppModule {
  constructor() {
    setTheme('bs3'); // or 'bs4'
  }
}
