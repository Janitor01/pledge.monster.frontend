'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ContractIds } from '@/deployments/deployments'
import { ApiPromise } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const ShiftLetter = ({ letter }) => {
  // If the letter is a space, render it directly without the motion effect
  if (letter === " ") {
    return " ";
  }

  return (
    <motion.span
      className="inline-block"
      whileHover={{ y: ["0%", "-100%"] }}
      transition={{ duration: 0.3, repeat: 0, repeatType: "reverse" }}
    >
      {letter}
    </motion.span>
  );
};

export default function ListProposal() {
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.pledge)
  console.log({ contract })
  const { api } = useInkathon()
  const router = useRouter()
  const [allProjects, setAllProjects] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      if (!contract || !api) {
        console.log('no contract')
        setLoading(false)
        return
      }
      const usersLengthResult = await contractQuery(
        api as ApiPromise,
        '',
        contract as ContractPromise,
        'get_users_length',
        undefined,
        [],
      )
      const crowdFundingAbi = await import('@/deployments/crowdfunding.json')
      console.log({ crowdFundingAbi })
      const {
        output: usersLength,
        isError: isE,
        decodedOutput: decO,
      } = decodeOutput(usersLengthResult, contract as ContractPromise, 'get_length_of_user')
      const allProjects = []
      for (let i = 0; i < usersLength; i++) {
        const projectAccountIdResult = await contractQuery(
          api as ApiPromise,
          '',
          contract as ContractPromise,
          'get_contract_for_user',
          undefined,
          [i],
        )
        const {
          output: projectAccountId,
          isError: isE,
          decodedOutput: decO,
        } = decodeOutput(
          projectAccountIdResult,
          contract as ContractPromise,
          'get_contract_for_user',
        )

        const numberProjectsUnderUserResult = await contractQuery(
          api as ApiPromise,
          '',
          contract as ContractPromise,
          'get_length_of_user',
          undefined,
          [projectAccountId],
        )
        console.log({ projectAccountId })
        const {
          output: numberOfProjectsForUser,
          isError: isErr,
          decodedOutput: decOr,
        } = decodeOutput(
          numberProjectsUnderUserResult,
          contract as ContractPromise,
          'get_length_of_user',
        )

        console.log({ numberOfProjectsForUser })

        for (let projectIndex = 0; projectIndex < numberOfProjectsForUser; projectIndex++) {
          const projectContractAccountResult = await contractQuery(
            api as ApiPromise,
            '',
            contract as ContractPromise,
            'get_projects_under_user',
            undefined,
            [projectAccountId, projectIndex],
          )
          const {
            output: projectContract,
            isError: isErr,
            decodedOutput: decOr,
          } = decodeOutput(
            projectContractAccountResult,
            contract as ContractPromise,
            'get_projects_under_user',
          )
          const crowdFundingContract = new ContractPromise(api, crowdFundingAbi, projectContract) // useContract(crowdFundingAbi, projectContract)

          const projectDetailsResult = await contractQuery(
            api as ApiPromise,
            '',
            crowdFundingContract as ContractPromise,
            'get_project',
            undefined,
            [],
          )
          const {
            output: projectDetails,
            isError: isErrr,
            decodedOutput: decOrr,
          } = decodeOutput(
            projectDetailsResult,
            crowdFundingContract as ContractPromise,
            'get_project',
          )
          allProjects.push({ ...projectDetails, projectContract })
          console.log({ projectDetails })
          console.log({ crowdFundingContract })
          console.log({ projectContract })
          console.log(projectIndex)
        }
      }
      setAllProjects(allProjects)
      setLoading(false)
      console.log(allProjects)
    }
    fetchProjects()
  }, [api, contract])

  const MAX_CHARACTERS = 180; 


  return (
    <div>
      <div className="flex flex-col items-center">
        {loading && <span className="loading loading-spinner loading-lg"></span>}
      </div>
      <div className="mb-8 flex w-full items-center justify-center">
        <div className="my-0 ml-0 mr-0 mt-8 flex w-9/12 flex-wrap justify-center space-x-8 space-y-2 pr-8">
          {allProjects.map((el, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }} 
              transition={{ duration: 0.2 }} 
              className={`container flex w-96 flex-col items-center justify-center ${
                index === 0 ? 'm-0 ml-8 mt-0' : ''
              }`}
            >
              <Card className="m-0 mx-0 w-96 card-component overflow-hidden rounded-xl">
                <CardContent className="!p-0 !pt-0">
                  <div className="relative">
                    <img
                      src={el.imageUrl}
                      alt="Project Cover"
                      className="h-40 w-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 flex w-3/4 flex-row justify-evenly">
                      <span className="badge badge-ghost badge-sm bg-opacity-60 p-2 text-white">
                        {el.category}
                      </span>
                      <span className="badge badge-ghost badge-sm bg-opacity-60 p-2 text-white">
                        {el.subcategory}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 overflow-visible">
                  <h2 className="card-title line-clamp-1 w-3/4 text-2xl font-bold overflow-visible">
                      {el.title.split("").map((char, i) => (
                        <ShiftLetter key={i} letter={char} />
                      ))}
                    </h2>
                    
                    <p className="line-clamp-3 max-h-[3.5rem] min-h-[3.5rem] text-sm text-slate-500 overflow-visible">
                      {el.elevatorPitch.substring(0, MAX_CHARACTERS).split("").map((char, i) => (
                        <ShiftLetter key={i} letter={char} />
                      ))}
                      {/* Add ellipsis if the text is longer than the max characters */}
                      {el.elevatorPitch.length > MAX_CHARACTERS ? '...' : ''}
                    </p>
                  </div>
                  <div className="card-actions justify-end p-6 pt-0">
                    <button
                      className="btn btn-primary mt-8 w-full bg-primary"
                      onClick={(event) => {
                        router.push(`/pages/info?params=${JSON.stringify({ ...el })}`)
                      }}
                    >
                      View More
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>



);




  
  

}
