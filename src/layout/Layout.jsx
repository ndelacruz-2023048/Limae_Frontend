import React from 'react'
import { Sidebar } from '../sidebar/sidebar'
import { Outlet } from 'react-router'

export const Layout = ({children}) => {
  return (
    <div className='flex flex-col h-screen bg-gradient-to-r from-[#e3ebfa] via-[#e4e9f9] to-[#e1def7]'>
      <div className='h-[7%]'>
        f
      </div>
      <div className='h-[93%] flex w-full'>
        <Sidebar />
        <div className='flex-1 flex justify-center overflow-y-auto'>
          <div className='w-[97%]'>
            {children ? children : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  )
}
