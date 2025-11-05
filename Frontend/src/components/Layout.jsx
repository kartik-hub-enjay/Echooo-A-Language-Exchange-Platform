import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import React from 'react'

const Layout = ({children, showSidebar = true}) => {
  return (
    <div className='min-h-screen bg-base-100' >
        <div className='flex h-screen'>
            {showSidebar && <Sidebar/>}
            <div className='flex-1 flex flex-col overflow-hidden'>
                <Navbar/>
                <main className='flex-1 overflow-y-auto bg-base-100'>{children}</main>
            </div>
        </div>
    </div>
  )
}

export default Layout