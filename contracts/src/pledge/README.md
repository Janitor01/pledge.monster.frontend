# Pledge Monster - Your Decentralized Fundraising Solution

Welcome to Pledge Monster, the ultimate decentralized fundraising platform!

## About Pledge Monster

Pledge Monster is a versatile platform designed to empower individuals and organizations of all kinds to easily raise funds for their projects. Whether you're launching a creative endeavor, a charitable cause, or a startup venture, Pledge Monster has got you covered.

## Key Features

- **Decentralized:** Pledge Monster operates on a decentralized network, ensuring transparency, security, and accessibility for everyone.

- **Open for All:** Our platform is open to anyone with a fundraising goal, making it simple for you to get your project off the ground.

- **Low Fees:** The fees generated on our platform are reinvested into our team and future Decentralized Autonomous Organization (DAO) development, ensuring the sustainability and growth of the Pledge Monster ecosystem.

## Built for Aleph Zero

Pledge Monster is proudly built on the Aleph Zero network, utilizing their cutting-edge technology to provide you with the best fundraising experience possible.

Start your fundraising journey with Pledge Monster today and let us help you bring your projects to life!





# Decentralized Crowdfunding Smart Contract

The Decentralized Crowdfunding Smart Contract is a blockchain-based contract developed using the Ink! framework, designed to facilitate decentralized crowdfunding campaigns. This contract allows users to create, update, and fund crowdfunding projects on a blockchain network.

## Project Data Structure

The contract defines a structured data type called `Project`, which represents the details of a crowdfunding project. This data structure includes fields such as project title, description, category, location, funding goals, reward tiers, and more, providing comprehensive project information storage.

### Reward Tiers and FAQs

The contract supports reward tiers and frequently asked questions (FAQs) for each project, allowing project creators to provide incentives to backers and address common inquiries about their campaigns.

### Project Information and Team Members

For additional context and transparency, the contract allows project creators to include information about themselves and their team members. This includes names, roles, images, and social media links.

## Contract Storage# Pledge Monster - Your Decentralized Fundraising Solution

Welcome to Pledge Monster, the ultimate decentralized fundraising platform!

## About Pledge Monster

Pledge Monster is a versatile platform designed to empower individuals and organizations of all kinds to easily raise funds for their projects. Whether you're launching a creative endeavor, a charitable cause, or a startup venture, Pledge Monster has got you covered.

## Key Features

- **Decentralized:** Operates on a decentralized network for transparency, security, and accessibility.
- **Open for All:** Anyone with a fundraising goal can use our platform.
- **Low Fees:** Fees are reinvested into our team and future DAO for sustainability and growth.

## Built for Aleph Zero

Pledge Monster is proudly built on the Aleph Zero network, providing the best fundraising experience possible.

Start your fundraising journey with Pledge Monster today and bring your projects to life!

---

# Decentralized Crowdfunding Smart Contract

The Decentralized Crowdfunding Smart Contract simplifies crowdfunding on the blockchain.

## Project Data Structure

- **Project:** Detailed project information storage, including title, description, goals, and rewards.
- **Reward Tiers and FAQs:** Incentives for backers and answers to common questions.
- **Project Information and Team Members:** Context and transparency with team member details.

## Contract Storage

- Projects associated with account IDs for easy access and management.

## Error Handling

Various error types ensure the crowdfunding process's integrity:

- `NotOwner`
- `ProjectNotFound`
- `InvalidInput`
- `FundingError`

## Contract Functions

- **Constructor Function:** Initializes the contract, setting the owner and an empty project list.
- **Create Project Function:** Allows account owners to create and store crowdfunding projects.
- **Update Project Function:** Enables project creators to modify their project details.
- **Fund Project Function:** Lets backers contribute to projects, handling payments and funding logic.

The Decentralized Crowdfunding Smart Contract forms a secure and efficient foundation for transparent crowdfunding campaigns on the blockchain, benefitting both project creators and backers.


Project data is stored within the contract using a mapping structure that associates each project with its respective account ID. This mapping simplifies project access and management within the contract.

## Error Handling

To maintain the integrity of the crowdfunding process, the contract defines a set of error types, including `NotOwner`, `ProjectNotFound`, `InvalidInput`, and `FundingError`, among others. These errors are used to handle various exceptional conditions that may occur during project creation, updating, and funding.

## Contract Functions

- **Constructor Function:** Initializes the contract, setting the contract owner to the deploying account and initializing an empty list of projects.

- **Create Project Function:** Enables project creators, identified by their account ID, to create and store their crowdfunding projects on the blockchain. This function requires ownership verification, ensuring that only the contract owner can create projects.

- **Update Project Function:** Allows project creators to update their project details. This function also requires ownership verification and enables project creators to modify their project information as needed.

- **Fund Project Function:** Allows backers to fund projects by sending cryptocurrency to the contract. This function accepts payments and can be customized to implement logic for handling funding, such as updating project funding goals.

The Decentralized Crowdfunding Smart Contract serves as the foundation for decentralized and transparent crowdfunding campaigns on the blockchain, offering project creators and backers a secure and efficient platform for fundraising endeavors.
