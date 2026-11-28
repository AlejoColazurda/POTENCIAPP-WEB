---
title: "Your website is slow: how to measure it for free and what to fix first"
description: A page that takes a while to load loses customers before they see what you sell. How to measure speed with free Google tools, how to read the result without being technical and what the most common causes are.
---

Someone searches for what you sell, taps your website on their phone and... waits. A blank screen, the image that never quite appears, the button that moves just as they were about to tap it. Many don't wait: they go back and open the next result.

Speed matters for two reasons: because **people leave** when a page takes too long, and because **Google takes it into account** as one of its page experience signals. The good news is that measuring it is free and the most common causes come up again and again.

## How to measure it in five minutes

### PageSpeed Insights

Go to **pagespeed.web.dev**, paste your website's address and tap "Analyze". It's a free Google tool and you don't need to create an account.

The result has two parts, and it's worth not mixing them up:

1. **Real user data** (at the top, if your website has enough visits): how the people who actually visited experienced it over the last 28 days. This is what matters most.
2. **Lab diagnostics** (the score from 0 to 100): a simulated test run at that moment. It's useful for finding problems, but the number changes from one test to the next. Don't obsess over reaching 100.

Always look at the **Mobile** tab: most of your visits come from phones, often on mobile data.

### Search Console

If your website is connected to **Google Search Console**, the **Core Web Vitals** report shows you which pages on your site have problems, grouped together. It's the way to see the whole site rather than page by page.

## The three metrics, explained without jargon

Google sums up the experience in three measures, called *Core Web Vitals*:

- **LCP (how long the main content takes to appear).** The time until the largest element on the screen is visible, usually the main photo or headline. Good is **2.5 seconds or less**.
- **INP (how long it takes to respond).** When you tap a button or a menu, how long the page takes to react. Good is **200 milliseconds or less**.
- **CLS (how much everything moves around).** Whether elements jump while the page loads (the classic button that shifts just as you were about to tap it). Good is **0.1 or less**.

If all three are green, your website is fine. If any is yellow or red, that's where the work is.

## The most common causes (and what to do)

### 1. Huge images

This is the number one cause. A photo taken with a phone can weigh several megabytes and be shown in a tiny box.

**What to do:** upload images at the size they're displayed, compressed, and in modern formats like **WebP** or **AVIF**. Many platforms do this automatically, but not always with header images or banners.

### 2. Too many apps, plugins and scripts

Every store app, every WordPress plugin, every tracking pixel and every floating chat adds code the phone has to download and run. Many were installed to try something out and just stayed.

**What to do:** make a list of everything installed and uninstall what you don't use. It's the cheapest improvement there is.

### 3. A video or carousel at the very top

A background video or a carousel with five large photos at the top of the page is the first thing that has to load, and it's heavy.

**What to do:** a single main image, well optimized, usually converts just as well or better and loads much faster.

### 4. Cheap or distant hosting

If the server is slow or far from your customers, everything else arrives late.

**What to do:** if PageSpeed flags that the server is slow to respond (it shows up as "server response time"), check with your hosting provider or consider moving.

### 5. Fonts and elements that load late

Custom fonts and banners that appear afterwards are the typical cause of everything moving around (the CLS).

**What to do:** reserve the space for images and banners, and limit the number of fonts.

## Platform or custom-built website?

On platforms like Tiendanube or Shopify, the platform optimizes the base, and what weighs most is **what you add**: apps, images and banners. On WordPress, the theme and plugins make much of the difference. On a custom-built website, speed depends on how it was built: it's worth asking in the contract for it to be delivered with the metrics in green, and [checking it when you receive it](/en/blog/como-recibir-proyecto-terminado-checklist).

## Where to start today

1. Measure your home page and your most visited product page on **pagespeed.web.dev**, on mobile.
2. Write down the three metrics.
3. Start with the cheapest fixes: uninstall what you don't use and shrink the images at the very top.
4. Measure again in a few days.

Did you measure your website and don't know what to do with the result? Send us the link and we'll tell you what's slowing it down.
