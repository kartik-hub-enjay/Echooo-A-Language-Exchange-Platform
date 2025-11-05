import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useLocation, Link } from 'react-router-dom';
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from 'lucide-react';

const Sidebar = () => {
    const {authUser} = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;
  return (
    <aside className='w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0' >
        {/* HEADER / LOGO */}
        <div className='p-5 border-b border-base-300'>
            <Link to="/" className='flex items-center gap-2.5'>
                <ShipWheelIcon className='w-9 h-9 text-primary' />
                <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Echooo</span>
            </Link>
        </div>

        {/* NAV - takes remaining space */}
        <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
            <Link
                to="/"
                className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}>
                <HomeIcon className='w-5 h-5 text-base-content opacity-70' />
                <span>Home</span>
            </Link>

            <Link
                to="/friends"
                className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""}`}>
                <UserIcon className='w-5 h-5 text-base-content opacity-70' />
                <span>Friends</span>
            </Link>

            <Link
                to="/notifications"
                className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""}`}>
                <BellIcon className='w-5 h-5 text-base-content opacity-70' />
                <span>Notifications</span>
            </Link>
        </nav>

        {/* USER PROFILE SECTION - stays at bottom */}
        <div className='p-4 border-t border-base-300'>
            <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                    <img src={authUser?.profilePic} alt="User Avatar" className='w-full h-full object-cover' />
                </div>
                <div className='flex-1'>
                    <p className='font-semibold text-sm'>{authUser?.fullName}</p>
                    <p className='text-xs text-success flex items-center gap-1'>
                        <span className='w-2 h-2 rounded-full bg-success inline-block'></span>
                        Online
                    </p>
                </div>
            </div>
        </div>
    </aside>
  )
}

export default Sidebar