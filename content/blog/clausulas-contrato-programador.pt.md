---
title: "As 9 cláusulas que o contrato com o seu programador precisa ter"
description: Escopo, etapas, pagamentos, mudanças, código, acessos, garantia, dados e saída. O que cada uma precisa dizer, como é uma cláusula fraca e o que perguntar antes de assinar.
---

*Série "Contratar software sem se queimar" · Capítulo 4*

Nos capítulos anteriores vimos o que acontece quando não há nada por escrito: o código não é seu, o orçamento triplica e ninguém sabe o que estava incluído. Este capítulo é o antídoto: as nove cláusulas que qualquer contrato de desenvolvimento precisa ter, seja uma loja online, um app ou um sistema interno.

O contrato não precisa ser longo. Precisa ser **concreto**. Para cada cláusula, mostramos como ela fica quando é fraca e como fica quando funciona.

> Isto não é assessoria jurídica. Se o projeto for grande, peça a um advogado que leia. Mas estas nove coisas você mesmo pode revisar em dez minutos.

## 1. Escopo: o que inclui e o que não inclui

- **Fraca:** "Desenvolvimento de loja online completa."
- **Boa:** uma lista de telas e funções ("catálogo com filtros por categoria, carrinho, pagamento com Mercado Pago, painel para editar produtos") e outra lista do que **não** inclui ("cadastro de produtos, integração com envios, versão em inglês").

A lista de exclusões é a que mais evita discussões. Se um fornecedor não quer escrevê-la, pergunte-se por quê.

## 2. Etapas com algo que você possa testar

- **Fraca:** "Entrega estimada: 6 a 8 semanas."
- **Boa:** etapas com data, e cada etapa termina com algo que você mesmo pode abrir e usar ("semana 3: catálogo navegável em um endereço de teste").

Um relatório de andamento que diz "estamos indo bem" não é uma etapa. Um link que você pode abrir, sim.

## 3. Pagamentos atrelados às etapas

- **Fraca:** "100% adiantado" ou "50% no início e 50% no final", com um final que nunca chega.
- **Boa:** cada pagamento é liberado quando uma etapa é aprovada. Um adiantamento razoável para começar, e o resto em parcelas que acompanham o que já está funcionando.

E **nota fiscal para cada pagamento**. Sem nota não há comprovante, e sem comprovante não há reclamação.

## 4. Mudanças: como se orça o que ficou de fora

- **Fraca:** "As mudanças adicionais são cobradas por hora."
- **Boa:** "O que não está no escopo é orçado por escrito, com preço e prazo, **antes** de começar. Se você não aprovar, não é feito." E um número de rodadas de revisão incluídas no design.

A palavra "hora" sem um teto é um cheque em branco.

## 5. Propriedade do código e entrega do código-fonte

- **Fraca:** o contrato não diz nada (e, como vimos no [capítulo 1](/pt/blog/quien-es-dueno-del-codigo), o silêncio joga contra você).
- **Boa:** "Os direitos sobre o desenvolvimento feito para o cliente são cedidos a ele depois de pago. O código-fonte é entregue em um repositório no nome do cliente."

## 6. Acessos e custos de terceiros no seu nome

- **Fraca:** "O fornecedor cuida da hospedagem e do domínio."
- **Boa:** "Domínio, hospedagem, contas da Apple e do Google, banco de dados e gateways de pagamento são criados no nome do cliente. O fornecedor acessa como usuário convidado." Mais uma lista dos **custos recorrentes** (hospedagem, domínio, licenças, apps) com o valor aproximado e quem paga cada um.

## 7. Garantia: o que cobre e quanto tempo levam

- **Fraca:** "Suporte pós-entrega."
- **Boa:** "Durante X meses, qualquer falha do que foi entregue é corrigida sem custo. As falhas que deixam o sistema fora do ar são atendidas em um prazo de Y horas." E que diga o que **não** cobre (mudanças novas, problemas causados por terceiros).

Uma garantia sem prazo de resposta é uma promessa, não uma garantia.

## 8. Dados e confidencialidade

O seu sistema vai guardar dados dos seus clientes: nomes, telefones, endereços, compras. Na Argentina, isso está sujeito à Ley 25.326 de Proteção de Dados Pessoais.

- **Fraca:** nada.
- **Boa:** "O fornecedor usa os dados somente para o projeto, não os compartilha e, ao terminar, os devolve ou os elimina." Mais confidencialidade sobre as informações do seu negócio.

## 9. Saída: o que acontece se alguém romper

A cláusula que ninguém quer ler, e a que mais importa quando as coisas dão errado.

- **Fraca:** nada, ou "qualquer das partes pode rescindir com 30 dias de aviso".
- **Boa:** "Se o contrato terminar antes, o cliente paga o que foi feito até a última etapa aprovada e recebe o código, os acessos e a documentação desse trabalho."

Voltamos à pergunta do capítulo 1: *se amanhã deixarmos de trabalhar juntos, o que eu levo?* Esta cláusula é a resposta por escrito.

## Como revisar um contrato em dez minutos

Pegue o contrato que lhe mandaram e marque cada ponto:

1. Existe uma lista do que **não** está incluído?
2. Cada etapa termina com algo que eu possa testar?
3. Os pagamentos acompanham as etapas?
4. As mudanças são orçadas por escrito antes de serem feitas?
5. Diz que o código é meu e que será entregue a mim?
6. Diz que as contas são criadas no meu nome, e quanto custam por mês?
7. A garantia tem prazo e tempo de resposta?
8. Diz o que fazem com os dados dos meus clientes?
9. Diz o que eu levo se rompermos?

Se faltarem três ou mais, não assine ainda: peça que as incluam. Um fornecedor sério faz isso sem drama. Se ele se ofender, isso também é informação.

Assim são os contratos da PotenciApp: [veja como trabalhamos](/pt/antes-de-contratarnos).

**Continua no capítulo 5:** [Seu programador sumiu: o que fazer nas primeiras 48 horas](/pt/blog/programador-desaparecio-que-hacer).
