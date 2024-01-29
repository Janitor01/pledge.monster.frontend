#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod pledge_monster{
    use ink::storage::{Mapping};
    use ink::prelude::vec::Vec;

    use crowdfunding::{DecentralizedCrowdfundingRef, Project};


    #[ink(storage)]
    pub struct PledgeMonster{
        all_crowd_funds: Mapping<AccountId, Vec<AccountId>>,
        owner: AccountId,
        all_users: Vec<AccountId>,
        accumulator_code_hash: Hash
    }


    impl PledgeMonster{
        #[ink(constructor)]
        pub fn new(accumulator_code_hash: Hash) -> Self{
            Self{
                all_crowd_funds: Default::default(),
                owner: Self::env().caller(),
                all_users: Vec::new(),
                accumulator_code_hash
            }
        }

        #[ink(message, payable)]
        pub fn deploy_crowdfund(&mut self, project: Project, version: u32) -> AccountId{
            let user = self.env().caller();
            let project_contract = DecentralizedCrowdfundingRef::new(user, project)
            .endowment(0)
            .code_hash(self.accumulator_code_hash)
            .salt_bytes(version.to_le_bytes())
            .instantiate();
            let project_address: ink::primitives::AccountId = project_contract.get_contract_address();
            let user_project =  self.all_crowd_funds.get(user);
            let user_crowdfunds = match user_project{
               Some(mut account_vec) =>  {
                   account_vec.push(project_address);
                    account_vec
                   },
               None => { let mut updated_vec = Vec::new();
                    self.all_users.push(user);
                       updated_vec.push(project_address);
                    updated_vec
                   }
           };
           self.all_crowd_funds.insert(user, &user_crowdfunds);

            project_address
        }


        #[ink(message)]
        pub fn set_code(&mut self, code_hash: [u8; 32]) {
            assert_eq!(self.env().caller(), self.owner, "only admin can call this function");
            ink::env::set_code_hash(&code_hash).unwrap_or_else(|err| {
                panic!(
                    "Failed to `set_code_hash` to {:?} due to {:?}",
                    code_hash, err
                )
            });
            ink::env::debug_println!("Switched code hash to {:?}.", code_hash);
        }

        #[ink(message)]
        pub fn get_contract_address(&self) -> AccountId{
            Self::env().account_id()
        }

        #[ink(message)]
        pub fn get_length_of_user(&self, user: AccountId) -> u128{
            match self.all_crowd_funds.get(user){
                Some(value) => value.len() as u128,
                None => 0
            }
        }

        #[ink(message)]
        pub fn get_projects_under_user(&self, user: AccountId, index: u128) -> AccountId{
            match self.all_crowd_funds.get(user){
                Some(value) => value[index as usize].clone(),
                None => panic!("index does not exist")
            }
        }


        #[ink(message)]
        pub fn get_users_length(&self) -> u128{
            self.all_users.len() as u128
        }

        #[ink(message)]
        pub fn get_sale_for_user (&self, index: u128) -> AccountId{
            self.all_users[index as usize].clone()
        }


    }
    //0x9c3f4e0ed8b5554bae91307de2f72d2a5dd19fa227638c99e1d0491e27d7db09

}