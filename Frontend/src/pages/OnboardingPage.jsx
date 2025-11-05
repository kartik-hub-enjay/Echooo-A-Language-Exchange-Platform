import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import { CameraIcon, Key, Languages, ShuffleIcon,MapPinIcon, ShipWheelIcon, LoaderIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';


const OnboardingPage = () => {
  const {authUser} = useAuthUser();
  const queryClient = useQueryClient();

  const [formState , setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  const { mutate: onboardingMutation, isLoading } = useMutation({
    mutationFn : completeOnboarding,
    onSuccess: ()=>{
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
    ,onError: (err)=>{
      console.error("Onboarding error:", err);
      toast.error(err?.response?.data?.message || err?.message || "Onboarding failed");
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting onboarding data:", formState);
    onboardingMutation(formState);
  }

  const handleRandomAvatar = () =>{
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({...formState , profilePic:randomAvatar});
    toast.success("Random profile picture generated!");
  };
  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile Pic Container */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* image preview */}
              <div className='w-32 h-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="profile preview" className='w-full h-full object-cover' />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='w-12 h-12 text-base-content opacity-40'/>
                  </div>
                )}
              </div>

              {/* Generate Random Avatar button */}
              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                  <ShuffleIcon className='w-4 h-4 mr-2'/>
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* Full Name */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Full Name</span>
                </label>
                <input 
                type="text"
                name='fullName'
                value={formState.fullName}
                onChange={(e)=>setFormState({...formState , fullName:e.target.value})}
                className='input input-bordered w-full'
                placeholder='Your Full name'
                 />
              </div>

              {/* BIO */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Bio</span>
                </label>
                <textarea name="bio" value={formState.bio}
                onChange={(e)=>setFormState({...formState,bio:e.target.value})}
                className='textarea textarea-bordered h-24' placeholder='Tell others about yourself and your language learning goals'></textarea>
              </div>

              {/*LANGUAGES*/}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* NATIVE LANGUAGE */}
                <div className='form-control'>
                      <label className='label'><span className='label-text'>
                        Native Language
                        </span></label>
                        <select name="nativeLanguage"
                         value={formState.nativeLanguage}
                         onChange={(e)=>setFormState({...formState,nativeLanguage: e.target.value})}
                         className='select select-bordered w-full'>
                          <option value="">Select you native language</option>
                          {LANGUAGES.map((lang)=>(
                            <option value={lang.toLowerCase() } key={`native-${lang}`}>
                              {lang}
                            </option>
                          ))}
                         </select>
                </div>
                {/* LEARNING LANGUAGE */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>
                          Learning Language
                    </span>
                  </label>
                          <select name="learningLanguage"
                          value={formState.learningLanguage}
                          onChange={(e)=>setFormState({...formState,learningLanguage: e.target.value})}
                          className='select select-bordered w-full'>
                            <option value="">
                              Select language you're learning
                            </option>
                              {LANGUAGES.map((lang) => (
                                <option value={lang.toLowerCase()} key={`learning-${lang}`}>
                                  {lang}
                                </option>
                              ))}
                          </select>
                </div>
              </div>
              {/* LOCATION */}
              <div className='relative'>
                <MapPinIcon className='absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-base-content opacity-70' />
                <input type="text" name='location' value={formState.location}
                onChange={(e)=>setFormState({...formState,location:e.target.value
                })} className='input input-bordered w-full pl-10'
                placeholder='City, Country'/>
              </div>
              {/* SUBMIT BUTTON */}
              <button className='btn btn-primary w-full' disabled={isLoading} type='submit'>
                {!isLoading ? (
                  <>
                  <ShipWheelIcon className='w-5 h-5 mr-2'/>
                  Complete Onboarding
                  </>
                ):(
                  <>
                  <LoaderIcon className='animate-spin w-5 h-5 mr-2'/>
                  Onboarding...
                  </>
                )}
              </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage