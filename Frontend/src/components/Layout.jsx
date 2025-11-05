import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import React from 'react'

const Layout = ({children, showSidebar = true}) => {
  return (
    <div className='min-h-screen' >
        <div className='flex'>
            {showSidebar && <Sidebar/>}
            <div className='flex-1 flex flex-col'>
                <Navbar/>
                <main className='flex-1 overflow-y-auto'>{children}</main>
            </div>
        </div>
    </div>
  )
}

export default Layout