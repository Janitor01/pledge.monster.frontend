'use client'

import Link from 'next/link'
import { FC } from 'react'

import { HiOutlineExternalLink } from 'react-icons/hi'

import { ConnectButton } from '@/components/web3/connect-button'

export const HomeTopBar: FC = () => {
  return (
    <>
      <style jsx>{`
        .top-bar {
          position: absolute;
          top: 1%;
          right: 20%;
          z-index: 10;
        }

        @media (max-width: 600px) {
          .top-bar {
            top: 1%; // Adjusted for mobile
            right: 1.5%; // Adjusted for mobile
            left: 1.5%;
          }
        }
      `}</style>
      <div className="top-bar">
        <ConnectButton />
      </div>
    </>
  )
}
