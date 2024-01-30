'use client'

import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

import { ConnectButton } from '@/components/web3/connect-button'

export const HomeTopBar: FC = () => {
  const router = useRouter()
  const [isChecked, setChecked] = useState(false)

  const handleToggle = () => {
    const checkbox = document.getElementById('my-drawer') as HTMLInputElement
    if (checkbox) {
      checkbox.checked = !checkbox.checked
    }
  }
  return (
    <div className="navbar top-0 mt-0 bg-base-100 bg-primary">
      <div className="navbar-start">
        <div className="drawer z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="drawer-button">
              <div tabIndex={0} role="button" className="btn btn-circle btn-ghost ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ffffff"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
              {/* Sidebar content here */}
              <li
                onClick={() => {
                  handleToggle()
                  router.push('/pages/projects')
                }}
              >
                <a>All Projects</a>
              </li>
              <li
                className="drawer-button"
                onClick={() => {
                  handleToggle()
                  router.push('/pages/create')
                }}
              >
                <a>Create Project</a>
              </li>
              <li>
                <a>About Team</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl text-white">Pledge Monster</a>
      </div>
      <div className="navbar-end">
        <div className="top-bar">
          <ConnectButton />
        </div>

        <button className="btn btn-circle btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#ffffff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button
          className="btn btn-circle btn-ghost"
          onClick={() => {
            router.push('/pages/create')
          }}
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="white"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
