import { getDeploymentData } from '@/utils/getDeploymentData'
import { initPolkadotJs } from '@/utils/initPolkadotJs'
import { writeContractAddresses } from '@/utils/writeContractAddresses'
import { deployContract } from '@scio-labs/use-inkathon/helpers'

const main = async () => {
  const initParams = await initPolkadotJs()
  const { api, chain, account } = initParams

  // Deploy greeter contract
  const greeterData = await getDeploymentData('greeter')
  const greeter = await deployContract(
    api,
    account,
    greeterData.abi,
    greeterData.wasm,
    'default',
    [],
  )

  // Deploy pledge contract
  const pledgeData = await getDeploymentData('pledge')
  const pledge = await deployContract(api, account, pledgeData.abi, pledgeData.wasm, 'default', [
    '0x9c3f4e0ed8b5554bae91307de2f72d2a5dd19fa227638c99e1d0491e27d7db09',
  ])

  // Write contract addresses to `{contract}/{network}.ts` file(s)
  await writeContractAddresses(chain.network, {
    greeter,
    pledge, // Add your contract here
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
