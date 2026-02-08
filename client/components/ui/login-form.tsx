'use client';

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from './card'
import { authClient } from '../../lib/auth-client'
import { useState } from 'react'

const LoginForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  return (
    <div className=" flex flex-col gap-6 justify-center items-center">
        <div className='flex flex-col items-center justify-center space-y-4'>
            <Image src={'/logos.jpg'} alt="Login" width={500} height={500} />
            <h1 className='text-6xl font-extrabold text-blue-400'>Welcome Back! to CLI</h1>
            <p className='text-base font-medium text-zinc-400 '>Login to your account for allowing device flow</p>
        </div>
        <Card className="border-dashed border-2">
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant={"outline"}
                className="w-full h-full"
                type="button"
                onClick={() => authClient.signIn.social({
                  provider: "github",
                  callbackURL: "http://localhost:3000"
                })}
               
              >
                <Image src={"/github.svg"} alt="Github" height={16} width={16} className="size-4 dark:invert" />
                Continue With GitHub
              </Button>

            </div>

          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
