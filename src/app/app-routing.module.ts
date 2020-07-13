import { LogoutComponent } from './logout/logout.component';
import { AlterarPlanoAutogestaoComponent } from './meus-planos/alterar-plano-autogestao/alterar-plano-autogestao.component';
import { CobrancasComponent } from './autogestao/cobrancas/cobrancas.component';
import { VerificarDadosComponent } from './carrinho/verificar-dados/verificar-dados.component';
import { TermoContratoAutogestaoComponent } from './termo-contrato-autogestao/termo-contrato-autogestao.component';
import { TermoContratoAnuncioComponent } from './termo-contrato-anuncio/termo-contrato-anuncio.component';
import { PoliticaQualidadeComponent } from './politica-qualidade/politica-qualidade.component';
import { HistoricoProprietarioComponent } from './autogestao/imoveis/historico-proprietario/historico-proprietario.component';
import { BoletoPorImovelComponent } from './autogestao/boleto/boleto-por-imovel/boleto-por-imovel.component';
import { BoletosGeradosComponent } from './autogestao/boleto/boletos-gerados/boletos-gerados.component';
import { HistoricoBoletosComponent } from './autogestao/boleto/historico-boletos/historico-boletos.component';
import { FinalizacaoComponent } from './carrinho/finalizacao/finalizacao.component';
import { DetalheImovelComponent } from './autogestao/imoveis/detalhe-imovel/detalhe-imovel.component';

import { TermosCondicoesUsoComponent } from './termos-condicoes-uso/termos-condicoes-uso.component';
import { AnaliseCompletaComponent } from './analise-credito/analise-completa/analise-completa.component';
import { RelatorioAnuncioComponent } from './anuncio/relatorio-anuncio/relatorio-anuncio.component';
import { LembrarSenhaComponent } from './autenticacao/lembrar-senha/lembrar-senha.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AnunciosComponent } from './anuncio/anuncios/anuncios.component';
import { SalvarAnuncioComponent } from './anuncio/salvar-anuncio/salvar-anuncio.component';
import { DetalheAnuncioComponent } from './anuncio/detalhe-anuncio/detalhe-anuncio.component';
import { CarrinhoComponent } from './carrinho/carrinho/carrinho.component';
import { SalvarUsuarioComponent } from './usuario/salvar-usuario/salvar-usuario.component';
import { RedefinirSenhaComponent } from './autenticacao/redefinir-senha/redefinir-senha.component';
import { LoginComponent } from './autenticacao/login/login.component';
import { AuthGuardRouterService } from './services/auth-guard-router.service';

import { MeusPlanosComponent } from './meus-planos/meus-planos.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';
import { FaqComponent } from './faq/faq.component';
import { DicasSegurancaComponent } from './dicas-seguranca/dicas-seguranca.component';
import { SimulacaoValorPlanoComponent } from './simulacao-valor-plano/simulacao-valor-plano.component';
import { SalvarImovelComponent } from './autogestao/imoveis/salvar-imovel/salvar-imovel.component';
import { ImoveisComponent } from './autogestao/imoveis/imoveis.component';
import { FinanceiroComponent } from './autogestao/financeiro/financeiro.component';

import { SalvarConvenioComponent } from './autogestao/financeiro/convenio-bancario/salvar-convenio/salvar-convenio.component';

import { BoletoComponent } from './autogestao/boleto/boleto.component';
import { PagamentoComponent } from 'app/carrinho/pagamento/pagamento.component';
// tslint:disable-next-line:max-line-length
import { DetalheProprietarioComponent } from './autogestao/imoveis/historico-proprietario/detalhe-proprietario/detalhe-proprietario.component';
import { HistoricoContratoComponent } from './autogestao/imoveis/historico-contrato/historico-contrato.component';
import { ReajusteAluguelComponent } from 'app/autogestao/reajuste-aluguel/reajuste-aluguel.component';
import { RelatorioContratoComponent } from './autogestao/imoveis/relatorio-contrato/relatorio-contrato.component';
import { DetalheContratoComponent } from './autogestao/imoveis/historico-contrato/detalhe-contrato/detalhe-contrato.component';
import { TermoContratoAnaliseComponent } from './termo-contrato-analise/termo-contrato-analise.component';
import { LoginAreaExclusivaComponent } from './autenticacao/login-area-exclusiva/login-area-exclusiva.component';
import { HistoricoCobrancasComponent } from './autogestao/cobrancas/historico-cobrancas/historico-cobrancas.component';
import { DetalheCobrancaComponent } from './autogestao/cobrancas/detalhe-cobranca/detalhe-cobranca.component';
import { PrestacaoContasComponent } from './autogestao/financeiro/prestacao-contas/prestacao-contas.component';
import { PrestacaoContasProprietariosComponent } from './autogestao/financeiro/prestacao-contas-proprietario/prestacao-contas-proprietarios.component';
import { AdministracaoComponent } from './autogestao/administracao/administracao.component';
import { InformacoesBancariasComponent } from './autogestao/financeiro/informacoes-bancarias/informacoes-bancarias.component';
import { DetalhePrestacaoContasComponent } from './autogestao/financeiro/detalhe-prestacao-contas/detalhe-prestacao-contas.component';
import { ImprimirPrestacaoContasComponent } from './autogestao/financeiro/imprimir-prestacao-contas/imprimir-prestacao-contas.component';
import { DesativarImoveisAutogestaoComponent } from './meus-planos/desativar-imoveis-autogestao/desativar-imoveis-autogestao.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'anuncios',
    redirectTo: 'anuncios/listar'
    // component: AnunciosComponent,
    // canActivate: [AuthGuardRouterService]
  },
  {
    path: 'anuncios/listar',
    component: AnunciosComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'anuncios/cadastrar',
    component: SalvarAnuncioComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'anuncios/relatorio',
    component: RelatorioAnuncioComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'anuncios/:Uid', // Uid
    component: DetalheAnuncioComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'anuncios/:Uid/editar',
    component: SalvarAnuncioComponent,
    canActivate: [AuthGuardRouterService]
  },

  {
    path: 'login',
    redirectTo: '/autenticacao/login'
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'autenticacao/login/:returnUrl',
    redirectTo: '/autenticacao/login'
  },
  {
    path: 'autenticacao/login',
    component: LoginComponent
  },
  {
    path: 'login-area-exclusiva',
    redirectTo: '/autenticacao/login-area-exclusiva'
  },
  {
    path: 'autenticacao/login-area-exclusiva',
    component: LoginAreaExclusivaComponent
  },
  {
    path: 'autenticacao/redefinir',
    component: RedefinirSenhaComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'autenticacao/redefinir/:returnUrl',
    redirectTo: 'autenticacao/redefinir'
  },
  {
    path: 'usuario/cadastrar',
    component: SalvarUsuarioComponent
  },
  {
    path: 'usuario/editar',
    component: SalvarUsuarioComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent
  },
  {
    path: 'carrinho/pagamento',
    component: PagamentoComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'carrinho/finalizacao',
    component: FinalizacaoComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'carrinho/verificando-seus-dados',
    component: VerificarDadosComponent,
    canActivate: [AuthGuardRouterService]
  },
  // {
  //   path: 'carrinho/finalizacao',
  //   component: CarrinhoFinalizacaoComponent,
  //   canActivate: [AuthGuardRouterService]
  // },
  // {
  //   path: 'carrinho/confirmacao',
  //   component: CarrinhoConfirmacaoComponent,
  //   canActivate: [AuthGuardRouterService]
  // },
  // {
  //   path: 'carrinho/pagamento',
  //   component: PagamentoPaypalComponent,
  //   canActivate: [AuthGuardRouterService]
  // },
  {
    path: 'meus-planos',
    component: MeusPlanosComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'meus-planos/alterar-plano-autogestao',
    component: AlterarPlanoAutogestaoComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'meus-planos/desativar-imoveis-autogestao',
    component: DesativarImoveisAutogestaoComponent,
    canActivate: [AuthGuardRouterService]
  },
  {
    path: 'autenticacao/lembrar-senha',
    component: LembrarSenhaComponent
  },
  {
    path: 'analise-completa/:UidPlano',
    component: AnaliseCompletaComponent
  },
  {
    path: 'termos-condicoes-uso',
    component: TermosCondicoesUsoComponent
  },
  {
    path: 'politica-privacidade',
    component: PoliticaPrivacidadeComponent
  },
  {
    path: 'dicas-seguranca',
    component: DicasSegurancaComponent
  },
  {
    path: 'politica-qualidade',
    component: PoliticaQualidadeComponent
  },
  {
    path: 'termo-contrato-anuncio',
    component: TermoContratoAnuncioComponent
  },
  {
    path: 'termo-contrato-analise',
    component: TermoContratoAnaliseComponent
  },
  {
    path: 'termo-contrato-autogestao',
    component: TermoContratoAutogestaoComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'simulacao-valor-plano/:UidPlano',
    component: SimulacaoValorPlanoComponent
  },
  {
    path: 'autogestao/imoveis',
    component: ImoveisComponent
  },
  {
    path: 'autogestao/imoveis/cadastrar',
    component: SalvarImovelComponent
  },
  {
    path: 'autogestao/imoveis/:UidImovel/editar/novoContrato',
    component: SalvarImovelComponent
  },
  {
    path: 'autogestao/imoveis/:UidImovel/contrato/historico',
    component: HistoricoContratoComponent
  },
  {
    path: 'autogestao/imoveis/:UidImovel/contrato/:UidContrato/detalhe',
    component: DetalheContratoComponent
  },
  {
    path: 'autogestao/imoveis/relatorio-contrato',
    component: RelatorioContratoComponent
  },
  {
    path: 'autogestao/imoveis/:UidImovel/proprietario/historico',
    component: HistoricoProprietarioComponent
  },
  {
    path: 'autogestao/imoveis/:UidImovel/proprietario/:UidProprietario/detalhe',
    component: DetalheProprietarioComponent
  },
  {
    path: 'autogestao/imoveis/:UidImovel/editar',
    component: SalvarImovelComponent
  },
  {
    path: 'autogestao/imoveis/:UidImovel/editar/novoProprietario',
    component: SalvarImovelComponent
  },
  {
    path: 'autogestao/imoveis/:UidImovel/detalhe',
    component: DetalheImovelComponent
  },
  {
    path: 'autogestao/financeiro',
    component: FinanceiroComponent
  },
  {
    path: 'autogestao/financeiro/prestacao-contas',
    component: PrestacaoContasComponent
  },
  {
    path: 'autogestao/financeiro/prestacao-contas-proprietarios',
    component: PrestacaoContasProprietariosComponent
  },
  {
    path: 'autogestao/financeiro/prestacao-contas/:UidCobranca/detalhe',
    component: DetalhePrestacaoContasComponent
  },
  {
    path: 'autogestao/financeiro/prestacao-contas/:UidCobranca/imprimir',
    component: ImprimirPrestacaoContasComponent
  },
  {
    path: 'autogestao/financeiro/convenio-bancario/cadastrar',
    component: InformacoesBancariasComponent
  },
  {
    path: 'autogestao/financeiro/convenio-bancario/:UidConvenio/editar',
    component: InformacoesBancariasComponent
  },
  {
    path: 'autogestao/boleto',
    component: BoletoComponent
  },
  {
    path: 'autogestao/boleto/boleto-por-imoveis',
    component: BoletoPorImovelComponent
  },
  {
    path: 'autogestao/boleto/historico',
    component: HistoricoBoletosComponent
  },
  {
    path: 'autogestao/boleto/gerados',
    component: BoletosGeradosComponent
  },
  {
    path: 'autogestao/reajuste-aluguel',
    component: ReajusteAluguelComponent
  },
  {
    path: 'autogestao/cobrancas',
    component: CobrancasComponent
  },
  {
    path: 'autogestao/cobrancas/:UidCobranca/detalhe',
    component: DetalheCobrancaComponent
  },
  {
    path: 'autogestao/cobrancas/historico',
    component: HistoricoCobrancasComponent
  },
  {
    path: 'autogestao/administracao',
    component: AdministracaoComponent
  },
  {
    path: 'autogestao/financeiro/informacoes-bancarias',
    component: InformacoesBancariasComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      // enableTracing: true, // <-- debugging purposes only
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
