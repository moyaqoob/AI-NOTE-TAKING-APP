import type { Note } from '@prisma/client';
import React from 'react'

type Props = {
    noteId:string,
    deleteNoteLocally:(noteId:string)=> void;
}

const DeleteNoteItem = ({noteId,deleteNoteLocally}:Props) => {
  return (
    <div>DeleteNoteItem</div>
  )
}

export default DeleteNoteItem