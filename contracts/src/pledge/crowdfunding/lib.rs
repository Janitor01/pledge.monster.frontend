#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub use crate::decentralized_crowdfunding::{DecentralizedCrowdfunding, DecentralizedCrowdfundingRef, Project};

#[ink::contract]
mod decentralized_crowdfunding {
    use ink::prelude::vec::Vec;
    use ink::storage::traits::StorageLayout;
    use ink::prelude::string::String;

    #[derive(scale::Encode, scale::Decode, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, Debug, StorageLayout))]
    pub struct Project {
        title: String,
        elevator_pitch: String,
        category: String,
        subcategory: String,
        location: String,
        image_url: String,
        video_url: String,
        launch_date: u64, // Unix timestamp
        duration: u64,    // in seconds
        funding_goals: Vec<Balance>,
        reward_tiers: Vec<RewardTier>,
        story: String,
        risks_and_challenges: String,
        faqs: Vec<FAQ>,
        project_info: ProjectInfo,
        member_info: Vec<TeamMember>,
        wallet: AccountId,
        project_urls: Vec<String>,
        // Add more fields as required...
    }

    #[derive(scale::Encode, scale::Decode, Clone, Default)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, Debug))]
    pub struct RewardTier {
        amount: Balance,
        description: String,
    }

    #[derive(scale::Encode, scale::Decode, Clone, Default)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, Debug))]
    pub struct FAQ {
        question: String,
        answer: String,
    }

    #[derive(scale::Encode, scale::Decode, Clone, Default)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, Debug, StorageLayout))]
    pub struct ProjectInfo {
        name: String,
        info: String,
        image_url: String,
        video_url: String,
        social_media_links: Vec<String>,
    }

    #[derive(scale::Encode, scale::Decode, Clone, Default)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, Debug, StorageLayout))]
    pub struct TeamMember {
        name: String,
        role: String,
        image_url: String,
        social_media_links: Vec<String>,
    }

    #[ink(storage)]
    pub struct DecentralizedCrowdfunding {
        owner: AccountId,
        project:   Project,
        deployer: AccountId
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        ProjectNotFound,
        InvalidInput,
        FundingError,
        // Other errors...
    }

    impl DecentralizedCrowdfunding {
        #[ink(constructor)]
        pub fn new(owner: AccountId, project: Project) -> Self {
            Self {
                owner,
                project,
                deployer: Self::env().caller()
            }
        }

        fn is_owner(&self) -> bool {
            self.env().caller() == self.owner || self.env().caller() == self.deployer
        }

        #[ink(message)]
        pub fn get_owner(&self) -> AccountId{
            self.owner
        }

        #[ink(message)]
        pub fn get_project(&self) -> Project{
            self.project.clone()
        }   


        #[ink(message)]
        pub fn update_project(
            &mut self,
            new_project_details: Project,
        ) -> Result<(), Error> {
            if !self.is_owner() {
                return Err(Error::NotOwner);
            }
            self.project = new_project_details;
            Ok(())
        }

        #[ink(message, payable)]
        pub fn fund_project(&mut self, _project_id: AccountId) -> Result<(), Error> {
            let _amount = self.env().transferred_value();
            Ok(())
        }

        #[ink(message, payable)]
        pub fn claim_funds(&mut self) -> Balance{
            assert!(self.is_owner());
            let balance = Self::env().balance();
            assert!(balance > 0);
            Self::env().transfer(self.project.wallet, balance).expect("Could not send native tokens to the wallet");
            balance
        }


        #[ink(message)]
        pub fn get_contract_address(&self) -> AccountId{
            Self::env().account_id()
        }

        #[ink(message)]
        pub fn set_code(&mut self, code_hash: [u8; 32]) {
            assert!(self.is_owner(), "only admin can call this function");
            ink::env::set_code_hash(&code_hash).unwrap_or_else(|err| {
                panic!(
                    "Failed to `set_code_hash` to {:?} due to {:?}",
                    code_hash, err
                )
            });
            ink::env::debug_println!("Switched code hash to {:?}.", code_hash);
        }
    }
}
