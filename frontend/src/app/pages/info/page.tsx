'use client'

import { useState } from 'react'

import { ApiPromise } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import { useInkathon } from '@scio-labs/use-inkathon'

import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

export default function Info({ searchParams }) {
  //   const params = useSearchParams()
  const { api, activeAccount, activeSigner } = useInkathon()
  console.log({ searchParams })
  const [fundAmount, setFundAmount] = useState('0')
  const params = JSON.parse(searchParams.params)
  const handleFundClicked = async (event) => {
    console.log(searchParams)

    console.log({ title: params.title })
    const crowdFundingAbi = await import('@/deployments/crowdfunding.json')
    if (!activeAccount) {
      return
    }
    console.log(params.projectContract)
    const crowdFundingContract = new ContractPromise(api, crowdFundingAbi, params.projectContract) // useContract(crowdFundingAbi, projectContract)

    console.log(Number(fundAmount) * 1e12)
    const result = await contractTxWithToast(
      api as ApiPromise,
      activeAccount.address,
      crowdFundingContract,
      'fund_project',
      { value: Number(fundAmount) * 1e12 },
      [params.projectContract],
    )
    console.log(Number(fundAmount))
  }
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="mt-16 flex w-11/12">
        {/* 1 left panel */}
        <div className="w-3/5 flex-col  pb-2">
          <h2 className=" text-4xl font-bold">{params.title}</h2>
          <h2 className="text-sm text-slate-700">
            Personals models trained to Personal Memory, Unique to every individual
          </h2>
          <div className="mt-2 flex flex-row space-x-2">
            <h2 className="bg-slate-200 p-1 font-bold uppercase text-slate-700">category</h2>

            <h2 className="bg-slate-200 p-1 font-bold uppercase text-slate-700">subcategory</h2>
          </div>
          <iframe
            className="mt-2 h-96 w-full"
            src="https://www.youtube.com/embed/E7wJTI-1dvQ"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
          />
        </div>

        {/* 1 right panel */}
        <div className=" flex w-2/5 flex-col items-center ">
          <h2 className="card-title text-3xl font-bold text-black">$729,299</h2>
          <h2 className="mt-2 text-sm text-slate-700">72% raised of funding amount</h2>
          <progress className="progress progress-success mt-2 w-56" value="72" max="100"></progress>
          <h2 className="mt-2 w-3/4 text-center text-lg font-bold">72 days </h2>
          <h2 className="mt-0 text-sm text-slate-700">left to invest</h2>
          <div className="mt-8 flex flex-col items-center">
            <input
              value={fundAmount}
              onChange={(event) => {
                setFundAmount(event.target.value)
              }}
              type="number"
              className=" rounded-xl p-2"
            ></input>
            <button
              onClick={handleFundClicked}
              className="btn btn-primary mt-4 border-none bg-primary transition duration-500 hover:scale-110 hover:bg-sky-500"
            >
              Invest in Personal Ai
            </button>
          </div>
        </div>
      </div>
      {/* End of first section */}

      <div className="mt-8 flex w-11/12">
        <div className="bg-red flex w-3/5 flex-col">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold text-black">Human Memory is Imperfect</h2>
            <p className="text-sm text-slate-800">
              We only encounter a fraction of the total amount of information encountered in daily
              life,(about 80% forgotten in 6 minutes)
            </p>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              className="mt-2 h-96 w-11/12 rounded-2xl object-cover"
            />
            <p className="mt-2 w-11/12 text-sm text-slate-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae vel facilis commodi
              nobis labore dolore, maxime dignissimos aperiam fugiat ratione at quas nihil animi est
              itaque tenetur asperiores fugit, laboriosam veniam exercitationem! Nemo, odio dicta
              corporis expedita architecto neque cumque id delectus, et distinctio earum harum cum.
              Iure accusantium blanditiis, ut voluptates ipsum exercitationem non optio quaerat
              quidem, tenetur quas. Atque inventore voluptate harum. Error quo voluptates possimus
              ea eligendi autem sint ullam, aspernatur dolor blanditiis. Vero veniam rem explicabo
              dignissimos rerum optio asperiores. Eos architecto sunt iure neque magnam! Fugit
              sequi, eaque temporibus ut in quam iusto debitis! Numquam perspiciatis repudiandae
              perferendis modi cum. Earum, cum. Tempore quaerat ipsam excepturi repudiandae,
              voluptate reiciendis corrupti nisi rem quos dignissimos numquam.
            </p>
          </div>
        </div>
        {/* right panel 2 */}
        <div className="w-2/5 flex-col items-center">
          <h2 className="text-center text-2xl font-bold text-slate-700">Reward Tiers </h2>

          <h2 className="mt-8 text-center text-xl font-bold text-slate-700">$20000 </h2>
          <h2 className="text-center text-sm text-slate-800">lorem60</h2>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="flex flex-col items-center">
    //     <div className="flex  w-11/12 flex-col items-start">
    //       <h2 className="ml- mt-8 text-6xl font-bold">Project Title</h2>
    //     </div>
    //     <img
    //       src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    //       className="h-80 w-11/12 rounded-2xl object-cover"
    //     />
    //   </div>
    //   <div className="flex flex-col items-center">
    //     <div className="flex  w-11/12 flex-col items-start">
    //       <h2 className="mt-8 text-5xl font-semibold">Project Story</h2>
    //       <p>
    //         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam eos, optio non nam
    //         quam, et esse cum fuga id dolores sit repellendus, ullam excepturi omnis. Deserunt et,
    //         maiores asperiores exercitationem excepturi magnam officia similique quae iure quasi,
    //         hic incidunt doloremque. A, eveniet aspernatur eius accusantium dicta repellendus at hic
    //         rerum, blanditiis magni quod quasi quidem. Maxime est quis nulla neque.
    //       </p>
    //       <div className="flex flex-col">
    //         <p className="mt-8 inline-block  font-bold">Category: </p>
    //         <p className="inline-block  ">my category</p>
    //       </div>

    //       <div className="flex flex-col items-start">
    //         <p className="mt-8 inline-block  font-bold">Sub category: </p>
    //         <p className="inline-block  ">my category</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex flex-col items-center">
    //     <input
    //       value={fundAmount}
    //       onChange={(event) => {
    //         setFundAmount(event.target.value)
    //       }}
    //       type="number"
    //       className=" rounded-xl p-2"
    //     ></input>
    //     <button
    //       onClick={handleFundClicked}
    //       className=" btn btn-primary mt-2 border-none bg-primary transition duration-500 hover:scale-110 hover:bg-sky-500"
    //     >
    //       Fund Project
    //     </button>
    //   </div>
    //   <div className="flex flex-col items-center">
    //     <div className="mt-8 w-11/12 flex-col items-start">
    //       <h2 className="font-bold">Team Members</h2>
    //       <div className="ml-8 mr-8 overflow-x-auto">
    //         <table className="table">
    //           {/* head */}
    //           <thead>
    //             <tr>
    //               <th>Name</th>
    //               <th>Job</th>
    //               <th>Favorite Color</th>
    //               <th></th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {/* row 1 */}
    //             <tr>
    //               <td>
    //                 <div className="flex items-center gap-3">
    //                   <div className="avatar">
    //                     <div className="mask mask-squircle h-12 w-12">
    //                       <img
    //                         src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    //                         alt="Avatar Tailwind CSS Component"
    //                       />
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <div className="font-bold">Hart Hagerty</div>
    //                     <div className="text-sm opacity-50">United States</div>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td>
    //                 Zemlak, Daniel and Leannon
    //                 <br />
    //                 <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
    //               </td>
    //               <td>Purple</td>
    //             </tr>
    //             {/* row 2 */}
    //             <tr>
    //               <td>
    //                 <div className="flex items-center gap-3">
    //                   <div className="avatar">
    //                     <div className="mask mask-squircle h-12 w-12">
    //                       <img
    //                         src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    //                         alt="Avatar Tailwind CSS Component"
    //                       />
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <div className="font-bold">Brice Swyre</div>
    //                     <div className="text-sm opacity-50">China</div>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td>
    //                 Carroll Group
    //                 <br />
    //                 <span className="badge badge-ghost badge-sm">Tax Accountant</span>
    //               </td>
    //               <td>Red</td>
    //             </tr>
    //             {/* row 3 */}
    //             <tr>
    //               <td>
    //                 <div className="flex items-center gap-3">
    //                   <div className="avatar">
    //                     <div className="mask mask-squircle h-12 w-12">
    //                       <img
    //                         src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    //                         alt="Avatar Tailwind CSS Component"
    //                       />
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <div className="font-bold">Marjy Ferencz</div>
    //                     <div className="text-sm opacity-50">Russia</div>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td>
    //                 Rowe-Schoen
    //                 <br />
    //                 <span className="badge badge-ghost badge-sm">Office Assistant I</span>
    //               </td>
    //               <td>Crimson</td>
    //             </tr>
    //             {/* row 4 */}
    //             <tr>
    //               <td>
    //                 <div className="flex items-center gap-3">
    //                   <div className="avatar">
    //                     <div className="mask mask-squircle h-12 w-12">
    //                       <img
    //                         src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    //                         alt="Avatar Tailwind CSS Component"
    //                       />
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <div className="font-bold">Yancy Tear</div>
    //                     <div className="text-sm opacity-50">Brazil</div>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td>
    //                 Wyman-Ledner
    //                 <br />
    //                 <span className="badge badge-ghost badge-sm">
    //                   Community Outreach Specialist
    //                 </span>
    //               </td>
    //               <td>Indigo</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-8 flex flex-col items-center">
    //     <div className="stats shadow">
    //       <div className="stat">
    //         <div className="stat-figure text-primary">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             className="inline-block h-8 w-8 stroke-current"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    //             ></path>
    //           </svg>
    //         </div>
    //         <div className="stat-title">Funding Goal</div>
    //         <div className="stat-value text-primary">25.6K Azero</div>
    //         <div className="stat-desc">goal for project launch</div>
    //       </div>

    //       <div className="stat">
    //         <div className="stat-figure text-secondary">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             className="inline-block h-8 w-8 stroke-current"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M13 10V3L4 14h7v7l9-11h-7z"
    //             ></path>
    //           </svg>
    //         </div>
    //         <div className="stat-title">Launch Date</div>
    //         <div className="stat-value text-secondary">Feb 1, 2021</div>
    //         <div className="stat-desc">Date for project Launch</div>
    //       </div>

    //       <div className="stat">
    //         <div className="stat-figure text-secondary">
    //           <div className="avatar online">
    //             <div className="w-16 rounded-full">
    //               <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="stat-value">Amount Raised</div>
    //         <div className="stat-title">25k Azero</div>
    //         <div className="stat-desc text-secondary">Amount raised so far</div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-8 flex flex-col items-center">
    //     <h1 className="text-5xl font-bold"> Frequently Asked Questions</h1>
    //     <div className="w-11/12">
    //       <h1> Faq question</h1>
    //       <h1> Faq Answer</h1>
    //     </div>
    //   </div>

    //   <div>
    //     <h2> Project Socials</h2>
    //   </div>
    // </div>
  )
}
