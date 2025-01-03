# OCC Funding

> Cloud funding + Block chain (DAO, SBT)

### Overview
This project combines **crowd-funding** with blockchain technology to create a transparent and secure investment platform for both project operators and contributors.

Operators can issue SBT (Soul Bound Token) for each project and manage progress through milestones.

Contributors (backers) can vote on whether to continue the project at each milestone, and if the project fails, the invested funds are safely returned to the contributors.

### Key Features

- SBT Issuance

    Each crowd-funding project issues a unique SBT.
    When backers invest in the project, the SBT is bound to their wallet address, serving as proof of ownership.
    Milestone-Based Funding Structure

    Operators define multiple milestones, including the percentage of the total budget allocated to each.
    If the funding goal is not met, the project automatically terminates, and all contributions are returned to the backers.

- Voting Mechanism

    At each milestone, backers cast votes on whether the project should continue.
    If there are more negative votes than positive ones, the project terminates, and remaining funds are refunded.

- Dashboard

    Operator: Monitors overall funding progress, milestone status, and vote results through an administrative dashboard.
    Backer: Views personal investments, milestone progress, and voting status in a user-centric dashboard.

- Escrow-Like Refund System

    All contributed funds are locked in a smart contract and only released to the operator if each milestone passes the voting process.
    If the project is halted, the contract automatically refunds the contributors.