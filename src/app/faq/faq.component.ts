import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqCadastroProprietarios: any = [
    {
      Pergunta: 'Quero anunciar o meu imóvel. Quais são as opções de planos?',
      Resposta:
        '<p>Fique tranquilo! Certamente uma das opções que oferecemos, atenderá as suas expectativas! </p><p>Acesse o nosso site <strong>www.clickalugue.com.br</strong>, clique na opção “anúncio para aluguel direto com proprietário” e pronto!  Você terá acesso a todas as opções de planos disponíveis. Agora é só escolher aquela que melhor atende aos seus objetivos.</p>'
    },
    {
      Pergunta: 'Como faço para contratar o meu plano de anúncios?',
      Resposta:
        '<p>É muito fácil! </p><p>Agora que já escolheu o seu pacote, Clique na opção “Contratar ” correspondente ao plano escolhido. Logo aparecerá o seu “carrinho de compras”, com a descrição do plano que você escolheu. Se quiser contratar mais de um plano, na parte inferior da página, clique na opção ”Continuar comprando”, você voltará para a página inicial com as opções de planos, selecione o segundo plano desejado e assim por diante. Depois de escolher o seu(s) plano(s), basta clicar na opção “Confirmar compra”, no canto inferior direito da página. </p>'
    },
    {
      Pergunta: 'Como faço para me cadastrar? ',
      Resposta:
        '<p>Na tela de principal do site <strong>www.clickalugue.com.br</strong>, clique no ícone  <img src="../../../assets/images/icone-logout.png" />  e em seguida, na opção “Não tenho cadastro”, digite o seu endereço de e-mail e em seguida, clique ”Criar cadastro”. </p><p>Digite o número do seu CPF ou CNPJ, clique na opção “termo de uso” e leia com muita atenção.</p><p> Agora clique “Eu concordo com o Termo de Uso e Contrato”, em seguida clique na opção “Continuar”, no canto inferior direito da tela. </p><p>Abrirá a tela para completar seu cadastro. Preencha os campos com seus dados pessoais. Finalize com um clique na opção “ Cadastrar”.</p><p>Após a mensagem de cadastro realizado com sucesso, você receberá um e-mail com instruções de primeiro acesso.</p>'
    },
    {
      Pergunta:
        'Como faço para efetivar o pagamento do(s) plano(s) escolhido(s)? ',
      Resposta:
        '<p>O Click Alugue utiliza o Pay Pal como forma de pagamento, ao final da escolha do plano, você deverá preencher todos os campos com os dados do seu cartão de crédito ou debito, podendo também escolher um cartão previamente cadastrado em sua conta Pay Pal já existente.  Leia também a política de privacidade do Pay Pal. Para finalizar, no canto direito inferior, clique em “Pagar com cartão de crédito”. Pronto! Você receberá um e-mail com a confirmação de compra efetuada.</p>'
    },
    {
      Pergunta: 'Meu cadastro foi realizado? ',
      Resposta:
        '<p>É fácil confirmar! Vá até a caixa de entrada do seu e-mail e abra a mensagem enviada pelo Click Alugue, clique no link "acesse Click Alugue”, e digite seu e-mail e a senha temporária para confirmar o seu cadastro. Após a confirmação é obrigatório o cadastro de uma nova senha.</p>'
    },
    {
      Pergunta: 'Como altero os dados cadastrais?',
      Resposta:
        '<p>É super fácil! Para alterar o seus dados cadastrais, acesse o nosso site <strong>www.clickalugue.com.br</strong> e na tela “Identificação” digite o seu endereço de e-mail e senha. Clique no ícone <img src="../../../assets/images/icone-user-login-pq.png" /> , selecione a opção de editar perfil. Você poderá fazer as alterações que desejar. </p>'
    },
    {
      Pergunta: 'Não encontrei um plano ideal para mim. O que eu faço?',
      Resposta:
        '<p>Se nenhum dos planos disponíveis atendeu a sua necessidade, na tela principal do Click Alugue, clique em “Fale conosco”. Preencha o campo assunto, digite sua mensagem e clique em “Enviar”. Teremos prazer de respondê-lo em até 48h úteis.</p>'
    },
    {
      Pergunta: 'Como faço para excluir meu cadastro?',
      Resposta:
        '<p>O Click Alugue não possui esta funcionalidade, mas você pode solicitar esta exclusão através do Fale Conosco. Teremos prazer de respondê-lo em até 48 horas úteis. </p>'
    }
  ];

  faqAnunciosProprietarios: any = [
    {
      Pergunta: 'Como defino o preço do meu imóvel? ',
      Resposta:
        '<p>Esta decisão é exclusivamente sua. Sugerimos que realize uma pesquisa de valores de imóveis similares ao anunciado, tais como: metragem, bairro, cidade, etc.</p>'
    },
    {
      Pergunta: 'Como cadastro o meu anúncio?',
      Resposta:
        '<p>É bem simples fazer o seu anúncio!  Entre no site <strong>www.clickalugue.com.br</strong> e acesse o cadastro com seu login e senha de acesso. No canto superior direito, no ícone  <img src="../../../assets/images/icone-user-login-pq.png" />, clique e selecione a opção “Meus anúncios”.</p><p>Agora clique em “Ir para anúncios”. Muito bem!  Você está prestes a cadastrar o seu anúncio. Clique na opção “Criar novo anúncio”, selecione o plano e clique em “Continuar”. </p> <p>Agora atenção! Você deverá preencher todos os campos (tipo de imóvel, descrição, os números de telefone para que os interessados entrem em contato, principais características do seu imóvel, etc). Você está quase finalizando, mas agora é um momento muito importante: hora de cadastrar as fotos do seu imóvel. Para concluir o anúncio, clique em “Salvar”. Pronto seu anúncio está cadastrado, mas ainda não foi publicado no site. </p>'
    },
    {
      Pergunta: 'Qual a Diferença entre os botões Publicar e Salvar?',
      Resposta:
        '<p>Dúvida muito comum! Vamos explicar!</p><p><b>Salvar</b>: Este botão serve para você cadastrar seu imóvel e não publicar de imediato, pelo simples fato de não estar com todas as informações para a publicação do anúncio.</p><p><b>Publicar</b>: Este botão serve para publicar o anúncio do imóvel no site “www.apsa.com.br” imediatamente.</p>'
    },
    {
      Pergunta: 'Como concluo um anúncio cadastrado que ainda está incompleto?',
      Resposta:
        '<p>Para concluir o anúncio, vá até o nosso site <strong>www.clickalugue.com.br</strong>, acesse o seu cadastro. No canto superior direito clique no ícone <img src="../../../assets/images/icone-user-login-pq.png" />  e selecione a opção “Meus anúncios”. Perfeito! Agora basta clicar no anúncio que deseja e, inserir as informações faltantes. Ao final, lembre-se de clicar em “Salvar” ou  “Publicar”.</p>'
    },
    {
      Pergunta: 'Como incluo, excluo ou mudo a ordem das fotos no meu anúncio?',
      Resposta:
        '<p>As fotos são um grande atrativo do seu anúncio! Para incluir as fotos, vá até o nosso site <strong>www.clickalugue.com.br</strong>, acesse o seu cadastro, no canto superior direito, clique e selecione a opção “Meus anúncios”. Clique no anúncio que deseja alterar as fotos. No canto inferior esquerdo, clique na opção “Editar”. Vá até o final da página no campo “Imagens”, faça as alterações que desejar e clique em “Salvar” ou “Publicar”.</p>'
    },
    {
      Pergunta: 'Como deixo meu anúncio mais atrativo?',
      Resposta:
        '<p>Os pretendentes procuram anúncios precisos, com informações completas e fotos de alta qualidade. </p><p>Fique tranquilo! As dicas abaixo ajudarão a dar mais destaque ao seu anúncio.</p><p>É muito importante que você preencha todas as seções do seu anúncio.</p><p>Um anúncio completo ajuda os pretendentes a saberem o que esperar do seu imóvel. Demonstra o seu cuidado e atenção com eles.  Lembre-se:</p><ul><li><b>Descrever seu imóvel</b>: Seja criativo!  Crie um título e um resumo atraentes, detalhados e informativos. Explique claramente o que torna seu imóvel único, incluindo maior número de características possível, tais como: Metragem, Sol da manhã ou tarde, se é frente ou fundos, se possui infraestrutura, elevador, garagem, comércio próximo, opções de transporte, comodidades oferecidas, etc.</li><li><b>Carregar fotos de alta qualidade</b>: Capriche! Suas fotos podem e vão diferenciar o seu imóvel. Deixam a boa primeira impressão do seu imóvel nos pretendentes, na página dos resultados de busca.</li></ul>'
    },
    {
      Pergunta: 'Qual o tamanho máximo da foto cadastrada no anúncio?',
      Resposta:
        '<p>Esta é uma informação importante mesmo! O tamanho máximo de cada foto é 2Mb, utilizando as extensões jpeg, png e gif.</p>'
    },
    {
      Pergunta: 'Quantas fotos posso publicar no meu anúncio?',
      Resposta:
        '<p>Não se preocupe! Você poderá publicar até 20 fotos por anúncio.</p>'
    },
    {
      Pergunta:
        'O que pode e o que não pode ser anunciado? Existem restrições?',
      Resposta:
        '<p>Recebemos de braços abertos os mais variados tipos de imóveis, desde que se encaixem no critério a seguir:</p><ul><li>O imóvel é usado exclusivamente para fins comerciais ou residenciais</li></ul><p>Se identificarmos algum imóvel que não siga a nossa Política de Qualidade, poderemos tomar a decisão de excluir o anúncio publicado.</p><p>Consulte os nossos Termos de uso, Política de qualidade e Dicas de segurança para obter mais informações e conhecer outros requisitos para poder anunciar seu imóvel.</p>'
    },
    {
      Pergunta:
        'Em quanto tempo meu anúncio estará publicado e visível para os interessados?',
      Resposta:
        '<p>Após clicar no botão Publicar, o seu anúncio estará disponível em até 02(duas) horas após sua publicação.</p>'
    },
    {
      Pergunta: 'Como edito o meu anúncio?',
      Resposta:
        '<p>É muito fácil! Vá até o nosso site <strong>www.clickalugue.com.br</strong>, acesse o seu cadastro no canto superior direito clique no ícone  <img src="../../../assets/images/icone-user-login-pq.png" /> e selecione a opção “Meus anúncios”. Clique no anúncio que deseja alterar. No canto inferior esquerdo, clique na opção “Editar”. Faça as alterações e no final da página, lembre-se de clicar em “Salvar” ou “Publicar”.  Lembre-se somente algumas informações podem ser alteradas em anúncios já publicados. Simples assim!</p>'
    },
    {
      Pergunta: 'Como excluo um anúncio?',
      Resposta:
        '<p>Para excluir o anúncio, Vá até o nosso site <strong>www.clickalugue.com.br</strong>, acesse o seu cadastro no canto superior direito, clique no ícone  <img src="../../../assets/images/icone-user-login-pq.png" /> e selecione a opção “Meus anúncios”. Clique no anúncio que deseja excluir. No canto inferior direito, clique na opção “Remover este anúncio”. Confirme a exclusão do anúncio e pronto, seu anúncio foi excluído. ATENÇÃO, após a exclusão do anúncio, não poderá cadastrar outro no lugar do anúncio excluído. </p>'
    },
    {
      Pergunta:
        'Como visualizo os contatos de quem se interessou pelo meu anúncio?',
      Resposta:
        '<p>Desejamos agilizar o processo de locação, por isso os interessados no(s) seu(s) imóvel (is) terão acesso ao(s) seu(s) telefone(s) no próprio anúncio. Assim, o contato será feito diretamente com você. É bem simples e prático!</p>'
    },
    {
      Pergunta: 'Como visualizo as estatísticas do meu anúncio?',
      Resposta:
        '<p>É muito fácil! Vá até o nosso site <strong>www.clickalugue.com.br</strong>, acesse o seu cadastro no canto superior direito, clique no ícone <img src="../../../assets/images/icone-user-login-pq.png" /> e selecione a opção “Meus anúncios”.  Agora clique na aba “Relatório”. Selecione o período que deseja pesquisar e clique em “buscar”. Pronto!</p><p>Você terá acesso as principais informações do(s) seu(s) anúncio(s). Isso facilitará sua análise sobre a performance do(s) mesmo(s).</p>'
    },
    {
      Pergunta: 'Como altero ou cancelo o meu plano?',
      Resposta:
        '<p>Durante o período de vigência do (s) seu(s) plano(s), ele(s) não poderá(ão) ser alterado(s) ou cancelado(s).</p>'
    },
    {
      Pergunta: 'Posso renovar meu anuncio?',
      Resposta:
        '<p>Não, você deverá realizar a compra de um novo pacote de anúncio. </p>'
    }
  ];

  faqAnunciosPretendentes: any = [
    {
      Pergunta: 'Como faço a busca por imóveis?',
      Resposta:
        '<p>É bem simples! Basta acessar o site www.apsa.com.br  e utilizar as características para encontrar o imóvel desejado. Por exemplo: bairro, quantidade de quartos, vaga de garagem, e etc...</p>'
    },
    {
      Pergunta: 'Como entro em contato com o proprietário?',
      Resposta:
        '<p>É fácil! Na tela com as características e fotos dos imóveis, clique no campo “contato”. Lá você encontrará os telefones de contato do proprietário e também poderá, se preferir, enviar uma mensagem de texto para ele. Aproveite e forneça o seu telefone, assim o proprietário poderá retornar o seu contato.</p>'
    }
  ];

  faqAutoGestao: any = [
    
    {
      Pergunta: 'Quais são as opções de planos?',
      Resposta:
        '<p>Certamente uma das opções que oferecemos, atenderá as suas expectativas! </p><p>Acesse <strong>www.clickalugue.com.br</strong>, clique na opção “plataforma autogestão” e pronto!</p><p>Você terá acesso a todas as opções de planos disponíveis. Basta escolher aquela que melhor atende aos seus objetivos.</p>'
    },
    {
      Pergunta: 'Como faço para renovar o meu plano por assinatura?',
      Resposta: 
        '<p>Todos os planos mensais são renovados automaticamente mediante confirmação de pagamento da operadora do cartão.</p>'
    },
    {
      Pergunta: 'Como faço para contratar o meu plano por assinatura?',
      Resposta:
        '<p>É muito fácil e rápido!</p><p>Para contratar o plano mensal autogestão <span style="color="#FF0000"">básica ou autogestão plus</span>, clique na opção “Contratar”, logo aparecerá o seu “carrinho de compras”, com a descrição do plano que você escolheu.</p><p>Depois de escolher o seu plano, deverá ler e concordar com os termos de uso e contrato, em seguida click na opção “Confirmar compra”, no canto inferior direito da página.</p>'
    },
    {
      Pergunta:'Como faço para contratar o meu plano por contrato?',
      Resposta:
        '<p> É muito fácil e rápido!</p><p>Para contratar o plano por contrato, click na opção “Faça uma simulação”, informe os dados solicitados (valor do aluguel e período do contrato) e aparecerá o valor a ser pago pelo período definido de utilização da plataforma. Em seguida, click na opção “Contratar”,logo aparecerá no seu “carrinho de compras”, com a descrição do plano que você escolheu. Agora, deverá ler e concordar com os termos de uso e contrato, em seguida click na opção “Confirmar compra”, no canto inferior direito da página.</p>'
    },
    {
      Pergunta: 'Como faço para me cadastrar?',
      Resposta: 
        '<p> Na tela de principal do site <strong>www.clickalugue.com.br</strong>, clique no ícone <img src="../../../assets/images/icone-logout.png" />e em seguida, na opção “Não tenho cadastro”, digite o seu endereço de e-mail e em seguida, clique ”Criar cadastro”. Digite o número do seu CPF ou CNPJ, clique na opção “termo de uso” e leiacom muita atenção. Agora clique “Eu concordo com o Termo de Uso”,em seguida clique na opção “Continuar”, no canto inferior direito da tela. Abrirá a tela para completar seu cadastro. Preencha os campos com seus dados pessoais. Finalize com um clique na opção “ Cadastrar”. Após a mensagem de cadastro realizado com sucesso, você receberá um e-mail com instruções de primeiro acesso.</p>'  
    },
    {
      Pergunta: 'Como faço para efetivar o pagamento do(s) plano(s) escolhido(s)?',
      Resposta: 
        '<p>O ClickAlugue utiliza as plataformas de pagamento PayPal (planos por contrato) e IUGU (planos de assinatura), ao final da escolha do plano, você deverá preencher todos os campos com os dados do seu cartão de crédito.  Leia também a política de privacidade do Pay Pal e IUGU. Para finalizar, no canto direito inferior, clique em “Pagar com cartão de crédito”. Pronto! Você receberá um e-mail com a confirmação de compra efetuada.</p>'
    },
    {
      Pergunta: 'Meu cadastro foi realizado?',
      Resposta: 
        '<p>É fácil confirmar! Vá até a caixa de entrada do seu e-mail e abra a mensagem enviada pelo ClickAlugue, clique no link e digite seu e-mail e a senha temporária para confirmar o seu cadastro. Após a confirmação é obrigatório o cadastro de uma nova senha.</p><p>Caso não receba o e-mail de confirmação em sua caixa de entrada, verifique o seu SPAM.</p>'
    },
    {
      Pergunta: 'Como altero os dados cadastrais?',
      Resposta:
        '<p>É super fácil! Para alterar os seus dados cadastrais, acesse o nosso site <strong>www.clickalugue.com.br</strong> e clique no ícone <img src="../../../assets/images/icone-alteracao.png"/> digite o seu endereço de e-mail e senha e depois na opção de menu <img src="../../../assets/images/icone-menu.png" /> selecione <img src="../../../assets/images/icone-editar-perfil.png"/>. Você poderá fazer as alterações que desejar e no final basta clicar em “Salvar”.</p>'
    },
    {
      Pergunta: 'Não encontrei um plano ideal para mim. O que eu faço?',
      Resposta:
        '<p>Se nenhum dos planos disponíveis atendeu a sua necessidade, na tela principal do ClickAlugue, clique em “Fale conosco”. Preencha o campo assunto, digite sua mensagem e clique em “Enviar”. Teremos prazer de respondê-lo em até 48h úteis.</p>'
    },
    {
      Pergunta: 'Como faço para excluir meu cadastro?',
      Resposta:
        '<p>O Click Alugue não possui  não possuiu esta funcionalidade, mas você pode solicitar através do Fale Conosco. Teremos o prazer em respondê-lo em até 48 horas úteis. </p>'
    },
    {
      Pergunta: 'Como consulto meu(s) plano(s)?',
      Resposta:
        '<p>Acesse o nosso site <strong>www.clickalugue.com.br</strong> e clique no ícone <img src="../../../src/assets/images/icone-alteracao.png"/> digite o seu endereço de e-mail e senha e depois na opção de menu <img src="../../../assets/images/icone-menu.png" /> selecione a opção <img src="../../../assets/images/icone-meus-anuncios.png"/>. Pronto!</p>'
    },
    {
      Pergunta: 'Como cadastro o(s) meu(s) imóvel(is)?',
      Resposta:
        '<p>É fácil! Entre no site <strong>www.clickalugue.com.br</strong> e clique no ícone <img src="../../../assets/images/icone-alteracao.png"/> digite o seu endereço de e-mail e senha e depois na opção de menu <img src="../../../assets/images/icone-menu.png"/> selecione a opção “Meus Imóveis”. No lado esquerdo da tela, clique em “cadastrar novo imóvel”. Abrirá uma tela com quatro abas (1-imóvel, 2- proprietário, 3- contrato de administração e 4- contrato de locação). Agora atenção! Você deverá preencher todo os campos e ao final de cada aba, clique em “salvar e continuar”</p><p>Após efetuar o pagamento do plano escolhido, entre em meus imóveis e preencha as informações solicitadas para cadastro ao final clique em salvar e continuar. Tenham em mãos as informações necessárias para cadastro.</p>'
    },
    {
      Pergunta: 'Como consulto o histórico de cobranças?',
      Resposta:
        '<p>Simples, através do painel do usuário na opção “Cobrança” e depois selecionando a opção “Histórico de cobranças geradas”.</p>'
    },
    {
      Pergunta: 'Posso enviar o boleto para o meu cliente?',
      Resposta:
        '<p>Sim, você pode enviar o boleto impresso ou via e-mail.</p><p>Acesse a área de Cobrança, selecione a competência que gostaria de gerar ou imprimir e clique em Detalhamento, inclua novos cobranças ou descontos que serão inseridos no boleto, vá até o final e clique em Gerar Cobrança e confirme sua solicitação. Logo após acesse  o Histórico de Cobrança, clique em Detalhe e com isso você pode visualizar e reenviar por e-mail.</p>'
    },
    {
      Pergunta: 'Consigo corrigir um boleto já emitido?',
      Resposta:
        '<p>Sim, será permitido apenas a correção de taxas de cobranças, descontos, e-mail e vencimento. Através do painel do usuário na opção “Cobrança” e depois selecionando a opção “Histórico de cobranças geradas”</p>'
    },
    {
      Pergunta: 'Como lançar desconto e cobranças em um boleto?',
      Resposta: 
        '<p>Fácil, na opção “Cobranças”, selecione o imóvel e o vencimento desejado, clique em “Ver detalhamento” e depois em “Lançar Cobrança/Desconto”.</p>'
    },
    {
      Pergunta: 'Como lançar desconto e cobranças em um boleto já emitido?',
      Resposta:
        '<p>Simples, após o boleto gerado basta acessar a opção do painel do usuário “Cobrança” e depois selecionando a opção “Histórico de cobranças geradas”.</p>'
    },
    {
      Pergunta: 'Como gerar um contrato de locação pelo ClickAlugue?',
      Resposta: 
        '<p>O Click Alugue não gera o contrato de locação automaticamente, mas oferecemos 3 (três) modelos de opções, onde você pode escolher o que melhor atende à locação do seu imóvel.</p>'
    },
    {
      Pergunta: 'Como identifico o pagamento de um boleto?',
      Resposta:
        '<p>Acessando o painel do usuário, acesse o imóvel desejado em “Dashboard”, opção “meus imóveis “, selecione o imóvel desejado e clique na opção “Cobranças” . Na opção “Histórico de cobranças geradas” exibirá a listagem de boletos gerados com o respectivo status. Em verde “Pago”, em amarelo “Aberto” ou “Atrasado”.</p>'
    },
    {
      Pergunta: 'Posso cadastrar um imóvel em nome de uma menor idade?',
      Resposta:
        '<p>Sim, o sistema não bloqueia o cadastro por limite de idade do proprietário.</p>'
    },
    {
      Pergunta: 'Minha compra não foi aprovada?',
      Resposta:
        '<p>Quando sua compra não for aprovada, verifique se todos os campos de preenchimento do cartão de credito estão corretos, caso estejam, solicitamos que entre em contato com sua operadora do cartão.</p>'
    },
    {
      Pergunta: 'Quais são as informações necessárias para cadastrar um imóvel?',
      Resposta: 
        '<p>Simples, basta informar o endereço completo do imóvel (CEP, logradouro, número, bairro, cidade e estado), será necessário informar dados do proprietário (CPF, nome, e-mail, data de nascimento, identidade, órgão emissor, estado civil, sexo, telefone e conta bancária). </p><p>Caso seja administrador de imóveis, será necessário preenchimento da opção “Contrato de administração”.</p><p>Para finalizar, na opção “Contrato de locação” as informações necessárias são: Data início, duração, valor do aluguel, dia do vencimento, índice e mês de reajuste.</p>'
    },
    {
      Pergunta: 'Como são feitos os recebimentos dos pagamentos?',
      Resposta:
        '<p>Todos os pagamentos são transferidos automaticamente para a conta cadastrada do Usuário Gestor em até dois dias úteis após a confirmação do pagamento do boleto.</p>'
    },
    {
      Pergunta: 'Certamente uma das opções que oferecemos, atenderá as suas expectativas! ',
      Resposta:
        '<p>Não, o sistema repassa os valores, com pagamento confirmado, para a conta cadastrada no ClickAlugue, mas a responsabilidade de repasse para aos proprietários é de responsabilidade da administradora contratante do serviço ClickAlugue.</p>'
    },
    {
      Pergunta: 'Posso cadastrar qualquer banco para recebimento do aluguel?',
      Resposta:
        '<p>Sim, você precisa apenas do nome do banco, agencia e conta corrente.</p>'
    },
    {
      Pergunta: 'Como consulto o(s) meu(s) imóvel(is)?',
      Resposta:
        '<p>É bem simples! Entre no site <strong>www.clickalugue.com.br</strong> e clique no ícone <img src="../../../assets/images/icone-alteracao.png"/> digite o seu endereço de e-mail e senha e depois na opção de menu <img src="../../../assets/images/icone-menu.png"/> selecione a opção <img src="../../../assets/images/icone-meus-imoveis.png" />. Aparecerá(ão) todos os imóveis cadastrados, com endereço, nome do proprietário, do locatário e situação.</p>'
    },
    {
      Pergunta: 'Como faço para gerar um boleto de cobrança de aluguel?',
      Resposta:
        '<p>Entre no site <strong>www.clickalugue.com.br</strong> e clique no ícone <img src="../../../assets/images/icone-alteracao.png"/> digite o seu endereço de e-mail e senha e depois na opção de menu <img src="../../../assets/images/icone-menu.png"/> selecione a opção  <img src="../../../assets/images/icone-meus-imoveis.png"/>. Agora clique na aba <img src="../../../assets/images/icone-cobrancas.png"/> ,selecione a competência desejada, registrando lançamentos ou descontos na opção “Ver detalhamento”.  Basta clicar no botão “gerar cobranças” no final da página e confirmar a operação clicando no botão “SIM“.</p>'
    },
    {
      Pergunta: 'Quando o cliente é uma administradora de imóveis, as remessas ao proprietário são feitas automaticamente?',
      Resposta: 
        '<p>Não, o sistema repassa os valores, com pagamento confirmado, para a conta cadastrada no ClickAlugue, mas a responsabilidade de repasse para aos proprietários é de responsabilidade da administradora contratante do serviço ClickAlugue.</p>'
   }
    
  ];

  constructor() {}

  ngOnInit() {}
}
