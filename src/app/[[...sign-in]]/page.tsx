'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if(role){
        router.push(`/${role}`);
    }
  },[user,router]);

  return (
    <div className='h-screen flex justify-center items-center bg-asadSkyLite'>
        <SignIn.Root>
            <SignIn.Step name='start' className='bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2'>
                <h1 className='text-xl font-bold flex items-center gap-2'>
                    <Image src="/logo.png" alt="logo image" width={24} height={24}/>
                    MySchool
                </h1>
                <h2 className="text-gray-400">Sign in to your account</h2>
                <Clerk.GlobalError />
                  <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label className="text-sm font-medium text-zinc-950">Username</Clerk.Label>
                      <Clerk.Input
                          type="text"
                          required
                          className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                      />
                      <Clerk.FieldError className="block text-sm text-red-400" />
                  </Clerk.Field>
                  <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label className="text-sm  font-medium text-zinc-950">Password</Clerk.Label>
                      <Clerk.Input
                          type="password"
                          required
                          className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                      />
                      <Clerk.FieldError className="block text-sm text-red-400" />
                  </Clerk.Field>
                  <SignIn.Action
                      submit
                      className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
                  >
                      Sign In
                  </SignIn.Action>
            </SignIn.Step>
        </SignIn.Root>
    </div>
  )
}

export default LoginPage;