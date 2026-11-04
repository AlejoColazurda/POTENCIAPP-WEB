---
title: "De quem é o código do seu app? O detalhe que pode deixar você refém do seu programador"
description: Você pagou pelo desenvolvimento, mas isso não faz de você o dono. O que diz a lei argentina, o que o seu contrato precisa dizer e os sete acessos que precisam estar no seu nome.
---

*Série "Contratar software sem se queimar" · Capítulo 1*

Existe uma cena que se repete. Um negócio paga por um app, uma loja ou um sistema. Funciona bem por um ano. Um dia, brigam com o programador, ou o programador muda de emprego, ou simplesmente para de responder. E o dono descobre que não tem nada: nem o código, nem a conta onde o app está publicado, nem a senha do servidor, nem o domínio.

Pagou por algo que nunca foi seu.

## Pagar não é a mesma coisa que ser dono

Na Argentina, o software é protegido pela lei de propriedade intelectual (Ley 11.723, que o inclui expressamente desde a reforma da Ley 25.036). A regra geral é simples: **o autor é quem escreve**.

A lei traz uma exceção para os empregados: o que um funcionário contratado (com carteira assinada) programa como parte do seu trabalho pertence ao empregador, a menos que se combine outra coisa. Mas a maioria dos negócios não contrata funcionários para fazer o seu software: contrata um freelancer ou uma agência. E, nesse caso, **não existe nenhuma presunção a seu favor**. Se o contrato não diz que os direitos são cedidos a você, o mais provável é que continuem sendo de quem programou.

Na prática, isso significa que você pode ter permissão para *usar* o sistema, mas não para levá-lo a outro fornecedor, modificá-lo ou vendê-lo junto com o seu negócio.

> Isto não é assessoria jurídica: se o projeto for grande, peça a um advogado que leia o contrato antes de assinar. Mas que o assunto esteja no contrato depende de você.

## O que o contrato precisa dizer

Três coisas, por escrito e sem rodeios:

1. **Cessão de direitos.** Que os direitos patrimoniais sobre o código desenvolvido para você pertencem a você (ou são cedidos a você) depois de pago. Se o fornecedor usa peças próprias que reaproveita em outros projetos, que o contrato diga que você tem uma licença de uso perpétua sobre essas peças.
2. **Entrega do código-fonte.** Não basta "o app instalado". O contrato precisa dizer que entregam o código-fonte completo, em um repositório ao qual você tem acesso, a cada etapa e no final.
3. **Acessos no seu nome.** Que todas as contas de que o sistema precisa para funcionar sejam criadas no seu nome ou no nome da sua empresa, e que o fornecedor trabalhe com um usuário convidado.

Se o orçamento chegou por WhatsApp e não há contrato, nenhuma dessas três coisas existe.

## Os sete acessos que precisam estar no seu nome

O código é só uma parte. Um sistema vive espalhado em várias contas, e qualquer uma delas serve para deixar você preso:

| Acesso | Por que importa |
| --- | --- |
| **Domínio** (NIC Argentina ou o registrador que for) | Se estiver no nome do programador, o seu site e o seu e-mail dependem dele. No NIC Argentina, o seu CUIT (o número de identificação fiscal) precisa constar como titular. |
| **Repositório de código** (GitHub, GitLab) | É onde ficam o código e o seu histórico. Uma organização sua, com o fornecedor como membro convidado. |
| **Hospedagem ou servidor** (Vercel, AWS, um VPS) | Se a conta for dele, ele pode desligar tudo. E a fatura precisa chegar para você. |
| **Conta de Apple Developer** | O app é publicado no nome de uma conta. Se for a do programador, o app "é" dele perante a Apple. |
| **Conta de Google Play Console** | O mesmo vale para o Android. |
| **Banco de dados e backups** | Seus clientes, pedidos e vendas. Você precisa poder baixar uma cópia sem pedir licença a ninguém. |
| **Gateways de pagamento e APIs** (Mercado Pago, envios, WhatsApp, IA) | As credenciais precisam ser da sua conta. Se você cobra com as credenciais de outra pessoa, o dinheiro passa por outra pessoa. |

Transferir um app de uma conta da Apple ou do Google para outra é possível, mas exige a colaboração das duas partes. Se a relação já azedou, esse trâmite vira uma negociação. Melhor começar com tudo no seu nome.

## Como conferir hoje, mesmo que você já tenha o sistema

Não é preciso saber programar. Isto basta:

1. **Peça o link do repositório** e confirme que você consegue entrar com o seu próprio usuário.
2. **Procure o seu domínio no NIC Argentina** (ou no registrador) e veja quem aparece como titular.
3. **Pergunte em nome de quem estão a conta da Apple e a do Google** onde o app é publicado. Se na loja aparece o nome do programador, você já tem a resposta.
4. **Veja para quem chega a fatura da hospedagem.** Se não chega para você, não é seu.
5. **Peça um backup do banco de dados** e guarde-o. Se negarem ou disserem que "não dá", é um sinal de alerta.

Se alguma dessas respostas deixar você desconfortável, não precisa brigar: a maioria dos fornecedores sérios repassa os acessos sem problema quando você pede com clareza. O momento de fazer isso é **agora**, enquanto a relação está boa.

## A pergunta que separa um fornecedor sério

Antes de contratar, pergunte: *"Se amanhã deixarmos de trabalhar juntos, o que eu levo?"*

A resposta certa é curta: o código, os acessos, o banco de dados e a documentação para que outra pessoa possa continuar. Se a resposta for longa, vaga ou começar com "bom, depende", você já sabe o que precisa colocar no contrato.

Na PotenciApp, tudo isso vai por escrito antes de começar. Se quiser ver como fazemos, está em [Antes de nos contratar](/pt/antes-de-contratarnos).

**Continua no capítulo 2:** [Autópsia de uma loja online que custou o triplo do orçado](/pt/blog/autopsia-tienda-online-costo-el-triple).
