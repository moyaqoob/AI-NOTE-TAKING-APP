import { User } from '@prisma/client'
import React from 'react'

type Props={
    user:User
}

function AskAIButton({user}:Props) {
  console.log(user.email)
  return (
    <div>AskAIButton</div>
  )
}

export default AskAIButton