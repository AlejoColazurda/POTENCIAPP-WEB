---
title: "Autopsy of an app nobody downloaded"
description: A building-materials yard paid for an app to take orders. A year later it had 9 active users and had vanished from the App Store. We reconstruct what went wrong and what worked instead.
---

*"Buying software without getting burned" series · Chapter 6*

> **About this case.** It's a case put together from real situations that businesses tell us about when they come to us after a bad experience. The names don't exist and the numbers are illustrative. Each mistake, on its own, we have seen for real.

Raúl owns a building-materials yard in a city of 40,000 people. His customers are bricklayers, master builders and the occasional private individual who is building a house. Orders reach him by WhatsApp, by phone and at the counter, and many times they get lost among the messages.

A nephew tells him that what he needs is an app. Raúl hires a studio that builds it for iOS and Android, with a catalog, a cart and order tracking. The app comes out well made and it works.

A year later, this is the tally:

| Metric | Number |
| --- | --- |
| Total downloads | 140 |
| Users who placed at least one order | 31 |
| Active users in the last month | 9 |
| WhatsApp orders in the same month | over 300 |

And one day, the app disappeared from the App Store. This is the autopsy.

## Mistake 1: nobody asked "what for?"

**What happened.** The request was "an app." Nobody asked what problem it had to solve. Raúl's real problem wasn't that his customers couldn't place orders: it was that the WhatsApp orders were **getting lost**.

**How it could have been avoided.** By starting from the problem and not from the solution. "Orders are getting lost" has many possible answers, and an app for customers is one of the most expensive.

## Mistake 2: asking the customer to change their habits

**What happened.** The bricklayers were already ordering from Raúl by WhatsApp, from the job site, with a photo of a handwritten list. The app asked them to download something new, register, look up each product in a catalog of 2,000 items and build a cart. For them it was more work, not less.

**How it could have been avoided.** By looking at how the customer buys **today**. If there's already a channel they use effortlessly, the easiest thing is to organize that channel, not replace it. It's what we saw in [chapter 3](/en/blog/no-necesitas-una-app): for a customer who buys every so often, the download is the highest barrier.

## Mistake 3: not defining what "working" meant

**What happened.** Nobody said before starting how many orders through the app would make it worthwhile. For months, "the app runs" got confused with "the app works for the business."

**How it could have been avoided.** With a number before starting: "if in three months 20% of orders come in through here, we keep going; if not, we change plans." Without that number, nobody dares to say that something isn't working.

## Mistake 4: the maintenance nobody budgeted for

**What happened.** The Apple Developer membership renews every year. It was in the name of the studio, which had stopped working with Raúl. Nobody renewed it, and the app left the App Store. On Android it was still there, but with no updates.

**How it could have been avoided.** With the accounts in the business's name from the start ([chapter 1](/en/blog/quien-es-dueno-del-codigo)) and with the annual maintenance cost written into the budget ([chapter 4](/en/blog/clausulas-contrato-programador)).

## What did work

When Raúl started over, the approach was different: *how do we make sure no WhatsApp order gets lost?*

The solution had three parts, and none of them was an app for customers:

1. **A simple web catalog**, with up-to-date prices, shared over WhatsApp with a link. The customer builds their list and sends it **over WhatsApp**, already organized, without downloading or registering.
2. **An internal dashboard** where every incoming order gets logged, with a status (received, prepared, delivered) and who it was assigned to.
3. **An automatic notice** to the customer when the order goes out.

The customers kept using the channel they already used. What changed was what happened **inside** the yard.

## What the autopsy shows

The app didn't fail because it was badly made. It failed because it solved a problem Raúl didn't have, and not the one he did. Before paying for any development, ask yourself these three questions:

1. **What is the problem, in one sentence and without naming the technology?**
2. **How do my customers or my team solve it today, and what does it cost them?**
3. **What number will tell me, in three months, whether it worked?**

If the provider doesn't ask you these questions before quoting, ask them yourself. And if you'd like us to think them through together, tell us about your case: [this is how we work](/en/antes-de-contratarnos).

**Back to the start of the series:** [Who owns your app's code?](/en/blog/quien-es-dueno-del-codigo)
