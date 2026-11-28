---
title: "O seu site é lento: como medir de graça e o que corrigir primeiro"
description: Uma página que demora para carregar perde clientes antes que eles vejam o que você vende. Como medir a velocidade com ferramentas gratuitas do Google, como ler o resultado sem ser técnico e quais são as causas mais comuns.
---

Alguém procura o que você vende, toca no seu site pelo celular e... espera. A tela em branco, a imagem que não termina de aparecer, o botão que se mexe bem na hora em que a pessoa ia tocar. Muitos não esperam: voltam e entram no próximo resultado.

A velocidade importa por dois motivos: porque **as pessoas vão embora** quando uma página demora, e porque **o Google leva isso em conta** como um dos sinais de experiência da página. A boa notícia é que medir é grátis e que as causas mais comuns se repetem muito.

## Como medir em cinco minutos

### PageSpeed Insights

Entre em **pagespeed.web.dev**, cole o endereço do seu site e toque em "Analisar". É uma ferramenta gratuita do Google e não é preciso criar conta.

O resultado tem duas partes, e é bom não confundir:

1. **Dados de usuários reais** (em cima, se o seu site tiver visitas suficientes): como as pessoas que realmente entraram nos últimos 28 dias viveram a experiência. É isso o que mais importa.
2. **Diagnóstico de laboratório** (a pontuação de 0 a 100): um teste simulado naquele momento. Serve para encontrar problemas, mas o número muda de um teste para outro. Não fique obcecado em chegar a 100.

Olhe sempre a aba **Celular**: a maioria das suas visitas chega pelo telefone, muitas vezes com dados móveis.

### Search Console

Se o seu site está conectado ao **Google Search Console**, o relatório de **Core Web Vitals** mostra quais páginas do seu site têm problemas, agrupadas. É a forma de ver o site inteiro, e não página por página.

## As três métricas, explicadas sem termos técnicos

O Google resume a experiência em três medidas, chamadas *Core Web Vitals*:

- **LCP (quanto demora para aparecer o principal).** O tempo até que apareça o maior elemento da tela, normalmente a foto ou o título principal. O bom é **2,5 segundos ou menos**.
- **INP (quanto demora para responder).** Quando você toca em um botão ou em um menu, quanto a página demora para reagir. O bom é **200 milissegundos ou menos**.
- **CLS (quanto tudo se mexe).** Se os elementos pulam enquanto a página carrega (o clássico botão que muda de lugar bem na hora em que você ia tocar). O bom é **0,1 ou menos**.

Se as três estão no verde, o seu site está bem. Se alguma está no amarelo ou no vermelho, é ali que está o trabalho.

## As causas mais comuns (e o que fazer)

### 1. Imagens enormes

É a causa número um. Uma foto tirada com o celular pode pesar vários megas e ser exibida em um quadro pequenininho.

**O que fazer:** envie as imagens no tamanho em que são exibidas, comprimidas, e em formatos modernos como **WebP** ou **AVIF**. Muitas plataformas fazem isso sozinhas, mas nem sempre com as imagens do cabeçalho ou os banners.

### 2. Apps, plugins e scripts demais

Cada app da loja, cada plugin do WordPress, cada pixel de rastreamento e cada chat flutuante soma código que o celular precisa baixar e executar. Muitas vezes foram instalados para testar algo e ficaram.

**O que fazer:** faça uma lista de tudo o que está instalado e desinstale o que você não usa. É a melhoria mais barata que existe.

### 3. Um vídeo ou um carrossel no topo

Um vídeo de fundo ou um carrossel com cinco fotos grandes na parte de cima é a primeira coisa que precisa carregar, e é pesado.

**O que fazer:** uma única imagem principal, bem otimizada, costuma converter igual ou melhor e carrega muito mais rápido.

### 4. Hospedagem barata ou distante

Se o servidor é lento ou está longe dos seus clientes, todo o resto chega atrasado.

**O que fazer:** se o PageSpeed indicar que o servidor demora para responder (aparece como "tempo de resposta do servidor"), consulte o seu provedor de hospedagem ou avalie mudar.

### 5. Fontes e elementos que carregam tarde

As tipografias personalizadas e os banners que aparecem depois são a causa típica de que tudo se mexa (o CLS).

**O que fazer:** reservar o espaço das imagens e dos banners, e limitar a quantidade de tipografias.

## Plataforma ou site sob medida?

Em plataformas como a Tiendanube ou a Shopify, a base é otimizada pela plataforma, e o que mais pesa é **o que você adiciona**: apps, imagens e banners. No WordPress, o tema e os plugins fazem grande parte da diferença. Em um site sob medida, a velocidade depende de como ele foi construído: vale a pena pedir no contrato que ele seja entregue com as métricas no verde, e [conferir isso ao recebê-lo](/pt/blog/como-recibir-proyecto-terminado-checklist).

## Por onde começar hoje

1. Meça a sua página principal e a sua página de produto mais visitada em **pagespeed.web.dev**, no celular.
2. Anote as três métricas.
3. Comece pelo mais barato: desinstalar o que você não usa e diminuir as imagens do topo.
4. Meça de novo em alguns dias.

Você mediu o seu site e não sabe o que fazer com o resultado? Mande o link e dizemos o que está deixando ele lento.
