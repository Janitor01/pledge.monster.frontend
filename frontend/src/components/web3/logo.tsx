'use client'

import Image from 'next/image'
import { FC, useEffect, useState, useCallback } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { contractQuery, useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import 'chart.js/auto'
import IOULOGO from 'public/images/IOULOGO.png'
import { Doughnut } from 'react-chartjs-2'

import { Card, CardContent } from '@/components/ui/card'

export const Logo: FC = () => {
  return (
    <>
      <Card className="card-component">
        <CardContent className="grid grid-cols-2 gap-4 pb-3 pt-6">
          <div className="col-span-1 row-span-2 flex h-full w-full items-center justify-center">
            {/* Content for top left */}
            <div>
              <Image src={IOULOGO} priority height={212} alt="Github Repository" />
            </div>
          </div>

          <div className="col-span-1 flex h-full w-full items-center justify-center">
            {/* Content for top right */}
            <div className="text-center">
              <h2 className="mt-4 text-center font-mono text-gray-400">Market Cap</h2>
              <br />
              <strong>$100k</strong>
            </div>
          </div>

          <div className="col-span-1 flex h-full w-full items-center justify-center">
            {/* Content for bottom right */}
            <div className="mb-5 text-center">
              <h2 className="mt-4 text-center font-mono text-gray-400">Price per $IOU</h2>
              <br />
              <strong>0.0001 $AZERO</strong>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
export default Logo
