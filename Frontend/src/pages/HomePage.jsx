import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle, MapPinIcon, UserIcon, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FriendCard, { getLanguageFlag } from '../components/FriendCard';
import NoFriendsFound from '../components/NoFriendsFound';
import { getUserFriends, getRecommendedUsers, getOutgoingFriendReqs, sendFriendRequest } from '../lib/api';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestIds,setOutgoingRequestIds] = useState(new Set());

  const {data:friends=[],isLoading:loadingFriends} = useQuery({
    queryKey:["friends"],
    queryFn: getUserFriends
  })
  const {data:recommendedUsers=[],isLoading:loadingUsers, error:usersError} = useQuery({
    queryKey: ["users"],
    queryFn:getRecommendedUsers
  })

  const {data:outgoingFriendsReqs} = useQuery({
    queryKey: ["outgoingFriendsReqs"],
    queryFn: getOutgoingFriendReqs,
  })
  const {mutate:sendRequestMutation, isLoading} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: ()=> queryClient.invalidateQueries({queryKey: ["outgoingFriendsReqs"]}),
  })

  useEffect(()=>{
    const outgoingIds = new Set()
    if(outgoingFriendsReqs && outgoingFriendsReqs.length > 0){
      outgoingFriendsReqs.forEach((req)=>{
        outgoingIds.add(req.recipient._id)
      })
      setOutgoingRequestIds(outgoingIds)
    }
  },[outgoingFriendsReqs])


  return (
    <div className='min-h-full bg-base-100 p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-7xl space-y-10'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UserIcon className='mr-2 w-4 h-4'/>
            Friend Requests
          </Link>
        </div>
          {loadingFriends ? (
            <div className='flex justify-center py-12'>
              <span className='loading loading-spinner loading-lg'></span>
            </div>
          ) : friends.length === 0?(
            <NoFriendsFound/>
          ):(
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start'>
              {friends.map((friend)=>(
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
          <section className='pb-8'>
            <div className='mb-6 sm:mb-8'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div>
                  <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet New Learners</h2>
                  <p className='opacity-70'>
                    Discover perfect language exchange partners based on your profile
                  </p>
                </div>
              </div>
            </div>

            {loadingUsers ? (
              <div className='flex justify-center py-12'>
                <span className='loading loading-spinner loading-lg'></span>
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className='card bg-base-200 p-6 text-center'>
                <h3 className='font-semibold text-lg mb-2'>No recommendations available</h3>
                <p className='text-base-content opacity-70'>Check back later for new language partners!</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start auto-rows-fr'>
              {recommendedUsers.map((user)=>{
                const hasRequestBeenSent = outgoingRequestIds.has(user._id);

                return (
                  <div key={user._id} className='card bg-base-200 hover:shadow-lg transition-all duration-300 h-full'>
                    <div className='card-body p-5 space-y-4 flex flex-col'>
                            <div className='flex items-center gap-3'>
                              <div className='avatar'>
                                <div className='w-16 h-16 rounded-full overflow-hidden bg-base-300'>
                                  <img 
                                    src={user.profilePic} 
                                    alt={user.fullName} 
                                    className='w-full h-full object-cover'
                                    loading="lazy"
                                    onError={(e) => {
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`;
                                    }}
                                  />
                                </div>
                              </div>

                        <div>
                            <h3 className='font-semibold text-lg'>
                                {user.fullName}
                            </h3>
                            {user.location && (
                              <div className='flex items-center text-xs opacity-70 mt-1'>
                                <MapPinIcon className='w-3 h-3 mr-1'/>
                                  {user.location}
                              </div>
                            )}
                        </div>
                      </div>
                      {/* Languages with flags */}
                      <div className='flex flex-wrap gap-1.5'>
                        {user.nativeLanguage && (
                          <span className='badge badge-secondary'>
                            {getLanguageFlag(user.nativeLanguage)}
                            Native: {capitialize(user.nativeLanguage)}
                          </span>
                        )}
                        {user.learningLanguage && (
                          <span className='badge badge-outline'>
                            {getLanguageFlag(user.learningLanguage)}
                            Learning: {capitialize(user.learningLanguage)}
                          </span>
                        )}
                      </div>

                      {user.bio && <p className='text-sm opacity-70 line-clamp-3'>{user.bio}</p>}

                      {/* Action Button */}
                      <button className={`btn w-full mt-auto ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"}`}
                      onClick={() => sendRequestMutation(user._id)}
                      disabled={hasRequestBeenSent || isLoading}>
                        {hasRequestBeenSent ? (
                          <>
                          <CheckCircle className='w-4 h-4 mr-2'/>
                          Request Sent
                          </>
                        ) : (
                          <>
                          <UserPlus className='w-4 h-4 mr-2'/>
                          Send Friend Request
                          </>
                        )}

                      </button>
                    </div>
                  </div>
                )
              })}
              </div>
            )}
          </section>
      </div>
    </div>
  )
}

export default HomePage;

const capitialize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};