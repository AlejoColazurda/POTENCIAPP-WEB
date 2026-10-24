---
title: "Seu programador sumiu: o que fazer nas primeiras 48 horas"
description: Ele não responde, o sistema continua funcionando (por enquanto) e você não sabe o que tem. Um plano em ordem para inventariar, proteger o que é seu, pedir o que falta e não piorar as coisas.
---

*Série "Contratar software sem se queimar" · Capítulo 5*

Acontece mais do que se conta. O programador que fez a sua loja, o seu app ou o seu sistema deixa de responder. Às vezes arrumou outro trabalho, às vezes se mudou, às vezes houve um problema com pagamentos ou simplesmente se cansou. O sistema continua funcionando, mas você sabe que, no dia em que algo quebrar, não vai ter para quem ligar.

O pior que você pode fazer é entrar em pânico ou ameaçar. O melhor é seguir uma ordem.

## Hora 0 a 4: inventário

Antes de pedir qualquer coisa, você precisa saber o que tem. Monte uma tabela com isto:

| Peça | Está no meu nome? | Eu tenho acesso? |
| --- | --- | --- |
| Domínio | | |
| Hospedagem ou servidor | | |
| Repositório de código | | |
| Banco de dados | | |
| Conta de Apple Developer | | |
| Conta de Google Play | | |
| Mercado Pago e outros gateways de pagamento | | |
| E-mail do negócio | | |

Como descobrir sem saber programar:

- **Domínio:** procure no NIC Argentina (se for .com.ar) ou em um buscador de "whois" (se for .com) e veja o titular e a **data de vencimento**.
- **Hospedagem:** procure no seu e-mail faturas da Vercel, AWS, Hostinger, DonWeb ou parecidas. Se nunca chegou nenhuma, a conta não é sua.
- **Apps:** abra o seu app na App Store e no Google Play e veja o nome do desenvolvedor que aparece abaixo do título.
- **Mercado Pago:** entre na sua conta e procure a seção de credenciais ou de integrações para ver quais aplicativos estão conectados.

## Hora 4 a 12: proteger o que é seu

Tudo o que estiver no seu nome, proteja **agora**, enquanto o sistema funciona:

1. **Troque as senhas** das contas que são suas e ative a verificação em duas etapas.
2. **Confira quem mais tem acesso** a cada conta e remova os usuários que você não reconhece ou que não deveriam mais estar ali. Se o programador ainda aparece em uma conta sua, decida com calma se vai tirá-lo já ou depois de recuperar o que falta: se você ainda precisa que ele lhe passe algo, cortar o acesso de uma vez pode travar a conversa.
3. **Baixe tudo o que puder do seu painel:** lista de produtos, clientes, pedidos, vendas. A maioria dos painéis tem um botão para exportar para Excel ou CSV. Se o sistema cair amanhã, essa planilha é o seu negócio.
4. **Anote quando o domínio vence.** Se vence logo e está no nome de outra pessoa, é a primeira coisa a resolver: se ninguém renovar, o seu site e o seu e-mail param de funcionar.

## Hora 12 a 24: o pedido, por escrito

Agora sim, escreva para ele. Não por áudio de WhatsApp: por escrito, em uma mensagem clara e sem agressividade, que depois você possa mostrar.

> Olá, [nome]. Como não vamos continuar trabalhando juntos, preciso que você me passe o acesso ao seguinte: o código-fonte do sistema, o domínio [domínio] no meu nome, a conta de hospedagem, um backup do banco de dados e as contas onde os apps estão publicados. Podemos combinar isso esta semana? Se houver algo pendente de pagamento entre nós, conversamos.

A última linha importa. Muitas vezes o sumiço tem por trás um pagamento pendente ou um mal-entendido, e oferecer-se para resolver destrava tudo.

Se não houver resposta em alguns dias, o passo seguinte na Argentina costuma ser uma **carta documento** (notificação formal com valor legal) com o mesmo pedido. Para isso, e se houver um contrato de por meio, convém que um advogado oriente você.

## Hora 24 a 48: o plano B

Enquanto espera, prepare a alternativa. Depende do que estiver faltando:

- **Se você não tem o código mas o site funciona:** um desenvolvedor novo pode avaliar se vale a pena recuperá-lo ou refazê-lo. Às vezes refazer uma loja pequena sai mais barato do que brigar pelo código antigo.
- **Se o app está na conta da Apple ou do Google do programador:** a Apple e o Google permitem transferir um app de uma conta para outra, mas quem tem que iniciar é o dono da conta original. Se ele não colaborar, a saída é publicar o app de novo em uma conta sua, como app novo: as avaliações e os usuários se perdem, e as pessoas têm que baixá-lo outra vez.
- **Se o domínio está no nome de outra pessoa:** o NIC Argentina tem trâmites de transferência de titularidade e de reclamação. Sem a colaboração do titular é mais lento, então comece o quanto antes.
- **Se a hospedagem é dele:** mesmo sem o código, com a planilha de produtos e clientes que você exportou dá para montar a loja de novo em outra plataforma em poucos dias.

## O que você não deve fazer

- **Não ameace nas redes sociais.** Isso fecha a porta para uma saída combinada e pode trazer problemas para você.
- **Não peça a "um conhecido que entende" que entre no servidor do programador.** Entrar em uma conta alheia sem permissão é crime, mesmo que o sistema seja seu.
- **Não pague a qualquer um que prometa "recuperar tudo em uma hora".** É a mesma lógica dos golpes de recuperação de contas.

## E para a próxima vez

Quase tudo neste capítulo se evita com o que vimos no [capítulo 4](/pt/blog/clausulas-contrato-programador): contas no seu nome desde o primeiro dia e uma cláusula de saída que diga o que você leva se romperem. Se você está nessa situação agora, escreva para nós: fazemos um diagnóstico do que você tem e do que falta, e dizemos o caminho mais curto, mesmo que não termine em contratar a gente.

**Continua no capítulo 6:** [Autópsia de um app que ninguém baixou](/pt/blog/autopsia-app-que-nadie-descargo).
