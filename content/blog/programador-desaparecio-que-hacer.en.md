---
title: "Your developer disappeared: what to do in the first 48 hours"
description: They don't answer, the system is still running (for now) and you don't know what you have. An ordered plan to take inventory, protect what's yours, ask for what's missing and avoid making things worse.
---

*"Buying software without getting burned" series · Chapter 5*

It happens more than people admit. The developer who built your store, your app or your system stops answering. Sometimes they found another job, sometimes they moved away, sometimes there was a payment problem or they just got tired. The system keeps working, but you know that the day something breaks you won't have anyone to call.

The worst thing you can do is panic or threaten. The best is to follow an order.

## Hour 0 to 4: inventory

Before you ask for anything, you need to know what you have. Build a table like this:

| Item | Is it in my name? | Do I have access? |
| --- | --- | --- |
| Domain | | |
| Hosting or server | | |
| Code repository | | |
| Database | | |
| Apple Developer account | | |
| Google Play account | | |
| Mercado Pago and other payment gateways | | |
| Business email | | |

How to find out without knowing how to code:

- **Domain:** look it up at NIC Argentina (if it's .com.ar) or in a "whois" lookup tool (if it's .com) and check the holder and the **expiration date**.
- **Hosting:** search your email for invoices from Vercel, AWS, Hostinger, DonWeb or similar. If you never received one, the account isn't yours.
- **Apps:** open your app in the App Store and in Google Play and look at the developer name shown under the title.
- **Mercado Pago:** log into your account and look for the credentials or integrations section to see which applications are connected.

## Hour 4 to 12: protect what is yours

Everything that's in your name, secure it **now**, while the system is working:

1. **Change the passwords** on the accounts that are yours and turn on two-step verification.
2. **Check who else has access** to each account and remove users you don't recognize or who shouldn't be there anymore. If the developer still appears on an account of yours, decide calmly whether to remove them right away or after you've recovered what's missing: if you still need them to hand something over, cutting off their access abruptly can stall the conversation.
3. **Download everything you can from your dashboard:** product list, customers, orders, sales. Most dashboards have an export button for Excel or CSV. If the system goes down tomorrow, that spreadsheet is your business.
4. **Write down when the domain expires.** If it expires soon and it's in someone else's name, that's the first thing to solve: if nobody renews it, your website and your email stop working.

## Hour 12 to 24: the request, in writing

Now write to them. Not by WhatsApp voice message: in writing, in a clear message with no aggression, that you can show later.

> Hi, [name]. Since we won't be working together anymore, I need you to give me access to the following: the system's source code, the domain [domain] in my name, the hosting account, a database backup and the accounts where the apps are published. Can we coordinate it this week? If there's anything pending payment between us, we'll talk about it.

The last line matters. Often there's an unpaid bill or a misunderstanding behind the disappearance, and offering to resolve it unlocks everything.

If there's no answer within a few days, the next step in Argentina is usually a **carta documento** (a formal certified letter used in Argentina) with the same request. For that, and if there's a contract involved, it's best to get advice from a lawyer.

## Hour 24 to 48: plan B

While you wait, prepare the alternative. It depends on what you're missing:

- **If you don't have the code but the site works:** a new developer can evaluate whether it's worth rescuing or rebuilding. Sometimes rebuilding a small store is cheaper than fighting over the old code.
- **If the app is in the developer's Apple or Google account:** Apple and Google allow transferring an app from one account to another, but the owner of the original account has to start it. If they don't cooperate, the way out is to publish the app again under an account of yours, as a new app: you lose the reviews and users have to download it again.
- **If the domain is in someone else's name:** NIC Argentina has procedures for transferring ownership and for filing a claim. Without the holder's cooperation it's slower, so start as soon as possible.
- **If the hosting is theirs:** even without the code, with the spreadsheet of products and customers you exported you can rebuild the store on another platform in a few days.

## What not to do

- **Don't threaten them on social media.** It closes the door to an agreed solution and can get you into trouble.
- **Don't ask "a friend who knows about this" to get into the developer's server.** Entering someone else's account without permission is a crime, even if the system is yours.
- **Don't pay anyone who promises to "recover everything in an hour."** It's the same logic as account-recovery scams.

## And for next time

Almost everything in this chapter is avoided with what we saw in [chapter 4](/en/blog/clausulas-contrato-programador): accounts in your name from day one and an exit clause that says what you take with you if the relationship ends. If you're in this situation right now, write to us: we'll do a diagnosis of what you have and what's missing, and we'll tell you the shortest path, even if it doesn't end with hiring us.

**Continued in chapter 6:** [Autopsy of an app nobody downloaded](/en/blog/autopsia-app-que-nadie-descargo).
