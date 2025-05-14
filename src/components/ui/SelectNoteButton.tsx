import type { Note } from '@prisma/client'
import React from 'react'

type Props = {
    noteId:Note
}

const SelectNoteButton = ({noteId}:Props) => {
  return (
    <div>SelectNoteButton</div>
  )
}

export default SelectNoteButton