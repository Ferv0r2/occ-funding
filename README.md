# OCC Funding

> Cloud funding + Block chain (DAO, SBT)

## Overview

This project combines **crowd-funding** with blockchain technology to create a transparent and secure investment platform for both project operators and contributors.

Operators can issue SBT (Soul Bound Token) for each project and manage progress through milestones.

Contributors (backers) can vote on whether to continue the project at each milestone, and if the project fails, the invested funds are safely returned to the contributors.

## 🛠️ Tech Stack

| Language                                                                                                                                                         | Framework                                                                                                                                                                                                                                                                                                                          | State Management                                                                                                                                                                                                                                  | UI Components                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://cdn.brandfetch.io/idKX_Hb7va/w/256/h/256/theme/dark/icon.png?c=1bx1739242486645id64Mup7aciCtoe-D4&t=1732638879396" width="100" height="100" /> | <img src="https://cdn.brandfetch.io/id2alue-rx/w/400/h/400/theme/dark/icon.jpeg?c=1bx1739201434260id64Mup7acmOr6Fn7v&t=1714556222178" width="100" height="100" /> <img src="https://cdn.brandfetch.io/id0AgeLF7b/w/400/h/400/theme/dark/icon.png?c=1bx1739242517994id64Mup7acSbShlH9y&t=1735475451887" width="100" height="100" /> | <img src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" width="100" height="100" /> <img src="https://tanstack.com/_build/assets/logo-color-600w-Er4SOkq1.png" width="100" height="100" /> | <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" width="100" height="100" /> <img src="https://ui.shadcn.com/apple-touch-icon.png" width="100" height="100" /> |
| TypeScript                                                                                                                                                       | Next.js v15 & React v19                                                                                                                                                                                                                                                                                                            | Zustand & React-query                                                                                                                                                                                                                             | Tailwind CSS & Shadcn-ui                                                                                                                                                                                                          |

## Key Features

### SBT Issuance

Each crowd-funding project issues a unique SBT.
When backers invest in the project, the SBT is bound to their wallet address, serving as proof of ownership.
Milestone-Based Funding Structure

Operators define multiple milestones, including the percentage of the total budget allocated to each.
If the funding goal is not met, the project automatically terminates, and all contributions are returned to the backers.

### Voting Mechanism

At each milestone, backers cast votes on whether the project should continue.
If there are more negative votes than positive ones, the project terminates, and remaining funds are refunded.

### Dashboard

Operator: Monitors overall funding progress, milestone status, and vote results through an administrative dashboard.
Backer: Views personal investments, milestone progress, and voting status in a user-centric dashboard.

### Escrow-Like Refund System

All contributed funds are locked in a smart contract and only released to the operator if each milestone passes the voting process.
If the project is halted, the contract automatically refunds the contributors.

## 📂 Folder Structure

This project leverages App Router

<details>
<summary>View details (Click to Expand)</summary>

```
occ-funding/
├── .env.local
├── .env.production
├── .env.test
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── 📄 about/
│   │   ├── page.tsx
│   │   └── ...
│   ├── 📊 dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ⚙️ settings/
│   │       └── page.tsx
│   └── ...
├── components/
│   ├── ui/
│   │   ├── 🔘 button/
│   │   │   ├── BoxButton.tsx
│   │   │   └── ...
│   │   ├── 🃏 card/
│   │   │   ├── ProfileCard.tsx
│   │   │   └── ...
│   │   ├── ✅ input/
│   │   │   ├── CheckBox.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── logic/
│   │   ├── profile/
│   │   │   ├── UserProfile.tsx
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── 📚 lib/
│   ├── 🛠️ api/
│   │   ├── Fetch.ts
│   │   └── ...
│   ├── 🧰 utils/
│   │   ├── tailwind-utils.ts
│   │   └── ...
│   └── ...
├── 🌐 public/
│   ├── 🖼️ images/
│   ├── 🖋️ fonts/
│   └── ...
├── 🎨 styles/
│   ├── globals.css
│   └── ...
├── 📝 types/
│   ├── index.d.ts
│   └── ...
├── 🛠️ .eslintrc.js
├── 🖌️ .prettierrc.json
├── ⚙️ next.config.js
├── 📄 tsconfig.json
├── 📦 package.json
└── ...
```

</details>
