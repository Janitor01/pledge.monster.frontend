'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { ApiPromise } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'

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
      console.log(allProjects[0])
    }
    fetchProjects()
  }, [api, contract])

  return (
    <div className="mb-8 flex w-full items-center justify-center ">
      {loading && <span className="loading loading-spinner loading-lg"></span>}
      <div className="w-80/100 my-0 ml-0 mr-0  mt-8 flex flex-wrap justify-center  space-x-8 space-y-2 pr-8">
        {allProjects.map((el, index) => (
          <div
            key={index}
            className={`container flex w-96 flex-col items-center justify-center  ${
              index === 0 ? 'm-0 ml-8 mt-0' : ''
            }`}
          >
            <div className="card m-0 mx-0 w-96 border border-solid bg-base-100">
              {/* <div className="m-0 mx-0 w-96 border border-solid bg-base-100"> */}
              {/* <figure> */}
              <div className="relative">
                <img src={el.imageUrl} alt="Project Cover" className="rounded-t-xl" />
                <div className="absolute bottom-1 right-1 flex w-3/4 flex-row justify-evenly">
                  <span className="badge badge-ghost badge-sm bg-opacity-10 p-2 text-white">
                    {el.category}
                  </span>
                  <span className="badge badge-ghost badge-sm bg-opacity-10 p-2 text-white">
                    {el.subcategory}
                  </span>
                </div>
              </div>

              {/* </figure> */}
              {/* </div> */}
              <div className="card-body">
                <h2 className="card-title line-clamp-1 w-3/4 text-2xl font-bold">{el.title}</h2>
                <p className="line-clamp-3 max-h-[3.5rem] min-h-[3.5rem] text-sm text-slate-700">
                  {el.elevatorPitch}
                </p>
                {/* {el.memberInfo
                  .filter((filterEl, filterIndex) => filterIndex < 2)
                  .map((member, index) => (
                    <div className="flex items-center justify-between" key={index}>
                      <img className="mask mask-squircle h-12 w-12" src={member.imageUrl} />

                      {member.name}
                      <br />
                      <span className="badge badge-ghost badge-sm">{member.role}</span>
                    </div>
                  ))} */}

                <div className="card-actions justify-end">
                  {/* <Link
                    href={{
                      pathname: '/pages/info',
                      query: el,
                    }}
                  > */}
                  <button
                    className="btn btn-primary mt-8 w-full bg-primary"
                    onClick={(event) => {
                      router.push(`/pages/info?params=${JSON.stringify({ ...el })}`)
                    }}
                  >
                    View More
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
