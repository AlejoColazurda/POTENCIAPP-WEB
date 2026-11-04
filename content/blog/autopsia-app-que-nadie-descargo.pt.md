---
title: "Autópsia de um app que ninguém baixou"
description: Um depósito de materiais de construção pagou por um app para receber pedidos. Um ano depois tinha 9 usuários ativos e tinha sumido da App Store. Reconstruímos o que deu errado e o que funcionou no lugar.
---

*Série "Contratar software sem se queimar" · Capítulo 6*

> **Sobre este caso.** É um caso montado com situações reais que negócios nos contam quando chegam depois de uma experiência ruim. Os nomes não existem e os números são ilustrativos. Cada erro, isoladamente, nós vimos de verdade.

Raúl tem um depósito de materiais de construção (um corralón) em uma cidade de 40.000 habitantes. Seus clientes são pedreiros, mestres de obra e algum particular que está construindo. Os pedidos chegam por WhatsApp, por telefone e no balcão, e muitas vezes se perdem entre mensagens.

Um sobrinho diz que o que ele precisa é de um app. Raúl contrata um estúdio que o faz para iOS e Android, com catálogo, carrinho e acompanhamento do pedido. O app sai bem feito e funciona.

Um ano depois, a conta é esta:

| Métrica | Número |
| --- | --- |
| Downloads totais | 140 |
| Usuários que fizeram pelo menos um pedido | 31 |
| Usuários ativos no último mês | 9 |
| Pedidos por WhatsApp no mesmo mês | mais de 300 |

E um dia, o app sumiu da App Store. Esta é a autópsia.

## Erro 1: ninguém perguntou "para quê?"

**O que aconteceu.** O pedido foi "um app". Ninguém perguntou que problema ele tinha que resolver. O problema real do Raúl não era que os clientes não conseguissem pedir: era que os pedidos do WhatsApp **se perdiam**.

**Como se evitava.** Começando pelo problema e não pela solução. "Estou perdendo pedidos" tem muitas respostas possíveis, e um app para clientes é uma das mais caras.

## Erro 2: pedir ao cliente que mude de hábito

**O que aconteceu.** Os pedreiros já pediam ao Raúl por WhatsApp, da obra, com uma foto da lista escrita à mão. O app pedia que baixassem algo novo, se cadastrassem, procurassem cada produto em um catálogo de 2.000 itens e montassem um carrinho. Para eles era mais trabalho, não menos.

**Como se evitava.** Olhando como o cliente compra **hoje**. Se já existe um canal que eles usam sem esforço, o mais fácil é organizar esse canal, não substituí-lo. É o que vimos no [capítulo 3](/pt/blog/no-necesitas-una-app): para um cliente que compra de vez em quando, o download é a barreira mais alta.

## Erro 3: não definir o que era "funcionar"

**O que aconteceu.** Ninguém disse antes de começar quantos pedidos pelo app fariam valer a pena. Durante meses, "o app está no ar" foi confundido com "o app funciona para o negócio".

**Como se evitava.** Com um número antes de começar: "se em três meses 20% dos pedidos entrarem por aqui, seguimos; se não, mudamos de plano". Sem esse número, ninguém se anima a dizer que algo não está funcionando.

## Erro 4: a manutenção que ninguém orçou

**O que aconteceu.** A assinatura do Apple Developer é renovada todo ano. Estava no nome do estúdio, que tinha deixado de trabalhar com o Raúl. Ninguém a renovou, e o app saiu da App Store. No Android continuava, mas sem atualizações.

**Como se evitava.** Com as contas no nome do negócio desde o início ([capítulo 1](/pt/blog/quien-es-dueno-del-codigo)) e com o custo anual de manutenção escrito no orçamento ([capítulo 4](/pt/blog/clausulas-contrato-programador)).

## O que funcionou

Quando Raúl recomeçou, a abordagem foi outra: *como fazemos para que nenhum pedido do WhatsApp se perca?*

A solução teve três partes, e nenhuma foi um app para clientes:

1. **Um catálogo web simples**, com preços atualizados, que é compartilhado por WhatsApp com um link. O cliente monta a sua lista e a envia **por WhatsApp**, já organizada, sem baixar nem se cadastrar.
2. **Um painel interno** onde cada pedido que entra fica registrado, com status (recebido, preparado, entregue) e a quem foi atribuído.
3. **Um aviso automático** ao cliente quando o pedido sai.

Os clientes continuaram usando o canal que já usavam. O que mudou foi o que acontecia **dentro** do depósito.

## O que a autópsia mostra

O app não falhou por estar mal feito. Falhou porque resolvia um problema que o Raúl não tinha, e não o que ele tinha. Antes de pagar por qualquer desenvolvimento, faça-se estas três perguntas:

1. **Qual é o problema, em uma frase e sem nomear a tecnologia?**
2. **Como os meus clientes ou a minha equipe o resolvem hoje, e quanto isso lhes custa?**
3. **Que número vai me dizer, em três meses, se funcionou?**

Se o fornecedor não fizer essas perguntas antes de orçar, faça-as você. E se quiser que pensemos juntos, conte o seu caso: [é assim que trabalhamos](/pt/antes-de-contratarnos).

**Volte ao início da série:** [De quem é o código do seu app?](/pt/blog/quien-es-dueno-del-codigo)
