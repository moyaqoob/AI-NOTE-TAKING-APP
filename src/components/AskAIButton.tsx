import { User } from '@supabase/supabase-js'
import React from 'react'
import { Button } from './ui/button'

type Props={
    user:User  | null
}

function AskAIButton({user}:Props) {
  console.log(user?.email)
  return (
    <Button className ="text-lg xl:text-md border duration-75 transition-all hover:bg-red-500 hover:duration-200  ">
        Ask AI
    </Button>
  )
}

export default AskAIButton