import Image from 'next/image'
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
import toast from 'react-hot-toast'

export default function ListProposal() {
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.pledge)
  console.log({ contract })
  const { api, activeAccount, activeSigner } = useInkathon()
  const router = useRouter()
  const [allProjects, setAllProjects] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchProjects = async () => {
      if (!activeAccount || !contract || !activeSigner || !api) {
        toast.error('Wallet not connected. Try again…')
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
          'get_sale_for_user',
          undefined,
          [i],
        )
        const {
          output: projectAccountId,
          isError: isE,
          decodedOutput: decO,
        } = decodeOutput(projectAccountIdResult, contract as ContractPromise, 'get_sale_for_user')

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
      console.log(allProjects[0])
    }
    fetchProjects()
  }, [api, contract])

  return (
    <div className="flex w-full items-center justify-center border border-solid ">
      <div className="w-80/100 my-0 ml-0 mr-0  mt-8 flex flex-wrap justify-center  space-x-8 space-y-2 pr-8">
        {allProjects.map((el, index) => (
          <div
            key={index}
            className={`container flex w-96 flex-col items-center justify-center  ${
              index === 0 ? 'm-0 ml-8 mt-0' : ''
            }`}
          >
            <div className="card m-0 mx-0 w-96 border border-solid bg-base-100">
              <figure>
                <Image
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title w-full text-center">{el.title}</h2>
                {el.memberInfo.map((member, index) => (
                  <p key={index}>{member.name}</p>
                ))}
                <p>Team Member 2</p>
                <p> {el.category} </p>

                <div className="card-actions justify-end">
                  {/* <Link
                    href={{
                      pathname: '/pages/info',
                      query: el,
                    }}
                  > */}
                  <button
                    className="btn btn-primary w-full bg-primary"
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