import React from 'react'

const NoNotificationsFound = () => {
  return (
    <div className='card bg-base-200 p-6 text-center'>
        <h3 className='font-semibold text-lg mb-2'>No notifications</h3>
        <p className='text-base-content opacity-70'>
            You're all caught up! Check back later for new friend requests.
        </p>
    </div>
  )
}

export default NoNotificationsFound
