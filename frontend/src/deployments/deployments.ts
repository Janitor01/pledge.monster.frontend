import { SubstrateDeployment } from '@scio-labs/use-inkathon'

// import abi from
import { env } from '@/config/environment'

/**
 * Add or change your custom contract ids here
 * DOCS: https://github.com/scio-labs/inkathon#2-custom-contracts
 */
export enum ContractIds {
  Greeter = 'greeter',
  pledge = 'pledge', // Add your contract here
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  console.log('iN dEPLOYMENTS')
  console.log('cool')
  const networks = env.supportedChains
  const deployments: SubstrateDeployment[] = []

  for (const networkId of networks) {
    for (const contractId of Object.values({ pledge: 'pledge' })) {
      console.log({ contractId, networkId })
      const abi = await import(`@inkathon/contracts/deployments/${contractId}/${contractId}.json`)
      const { address } = await import(
        `@inkathon/contracts/deployments/${contractId}/${networkId}.ts`
      )

      deployments.push({ contractId, networkId, abi, address })
    }
  }
  console.log({ deployments })
  return deployments
}
