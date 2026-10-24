---
title: "Who owns your app's code? The detail that can hold you hostage to your developer"
description: You paid for the development, but that doesn't make you the owner. What Argentine law says, what your contract has to say, and the seven accounts that must be in your name.
---

*"Buying software without getting burned" series · Chapter 1*

There's a scene that keeps repeating. A business pays for an app, an online store or a system. It works well for a year. Then one day they fall out with the developer, or the developer takes another job, or simply stops answering. And the owner discovers they have nothing: no code, no account where the app is published, no server password, no domain.

They paid for something that was never theirs.

## Paying is not the same as owning

In Argentina, software is protected by the intellectual property law (Ley 11.723, which covers it explicitly since the Ley 25.036 reform). The general rule is simple: **the author is whoever writes it**.

The law makes an exception for employees: what an employee on payroll programs as part of their job belongs to the employer, unless agreed otherwise. But most businesses don't hire employees to build their software: they hire a freelancer or an agency. And in that case **there is no presumption in your favor**. If the contract doesn't say the rights are transferred to you, they most likely still belong to whoever programmed it.

In practice, that means you may have permission to *use* the system, but not to take it to another provider, modify it, or sell it along with your business.

> This is not legal advice: if the project is big, have a lawyer read the contract before you sign. But making sure the topic is in the contract is up to you.

## What the contract has to say

Three things, in writing and with no ambiguity:

1. **Assignment of rights.** The economic rights over the code developed for you belong to you (or are assigned to you) once you've paid. If the provider uses its own components that it reuses in other projects, the contract should say you have a perpetual license to use those components.
2. **Delivery of the source code.** "The app installed" is not enough. It has to say they hand over the complete source code, in a repository you can access, at every stage and at the end.
3. **Accounts in your name.** All the accounts the system needs to run are created in your name or your company's name, and the provider works with a guest user.

If you got your quote over WhatsApp and there's no contract, none of these three things exists.

## The seven accounts that must be in your name

The code is only one part. A system lives spread across several accounts, and any one of them can be used to keep you tied down:

| Account | Why it matters |
| --- | --- |
| **Domain** (NIC Argentina or whichever registrar) | If it's in the developer's name, your website and your email depend on them. At NIC Argentina, make sure your CUIT (Argentine tax ID) is listed as the holder. |
| **Code repository** (GitHub, GitLab) | The code and its history live here. Set up an organization of your own, with the provider as a guest member. |
| **Hosting or server** (Vercel, AWS, a VPS) | If the account is theirs, they can shut everything down. And the bill has to come to you. |
| **Apple Developer account** | The app is published under an account. If it's the developer's, the app "belongs" to them as far as Apple is concerned. |
| **Google Play Console account** | Same thing for Android. |
| **Database and backups** | Your customers, orders and sales. You have to be able to download a copy without asking anyone's permission. |
| **Payment gateways and APIs** (Mercado Pago, shipping, WhatsApp, AI) | The credentials have to belong to your account. If you collect payments with someone else's credentials, the money goes through someone else. |

Transferring an app from one Apple or Google account to another is possible, but it takes the cooperation of both parties. If the relationship has already broken down, that process turns into a negotiation. Better to start with everything in your name.

## How to check it today, even if you already have the system

You don't need to know how to code. This is enough:

1. **Ask for the repository link** and check that you can get in with your own user.
2. **Look up your domain at NIC Argentina** (or at the registrar) and see who is listed as the holder.
3. **Ask whose name the Apple and Google accounts are under** where the app is published. If the developer's name shows up in the store, you already have your answer.
4. **Check who receives the hosting bill.** If it doesn't come to you, it isn't yours.
5. **Ask for a database backup** and keep it. If they refuse or tell you "it can't be done," that's a warning sign.

If any of these answers makes you uncomfortable, there's no need to fight: most serious providers hand over the accounts without any trouble when you ask clearly. The time to do it is **now**, while the relationship is good.

## The question that separates a serious provider

Before hiring, ask: *"If we stop working together tomorrow, what do I take with me?"*

The right answer is short: the code, the accounts, the database and the documentation so someone else can pick it up. If the answer is long, vague or starts with "well, it depends," you already know what to put in the contract.

At PotenciApp, all of this goes in writing before we start. If you'd like to see how we do it, check [Before hiring us](/en/antes-de-contratarnos).

**Continued in chapter 2:** [Autopsy of an online store that cost three times the budget](/en/blog/autopsia-tienda-online-costo-el-triple).
