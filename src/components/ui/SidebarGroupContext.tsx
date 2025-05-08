import {Note} from '@prisma/client'
import React from 'react'

type Props = {
    notes:Note[]
}

function SideBarGroupContent({notes}:Props) {
    console.log(notes)
  return (
    <div>
        Your notes here...
    </div>
  )
}

export default SideBarGroupContent