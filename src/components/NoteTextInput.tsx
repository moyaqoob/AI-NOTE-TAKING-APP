"use client"
import React, { useEffect, type ChangeEvent } from 'react'
import { Textarea } from './ui/textarea'
import { debounceTimeout } from '@/lib/constants';
import { useParams, useSearchParams } from 'next/navigation';
import useNote from '@/hooks/useNote';

type Props = {
    noteId:string,
    startingNoteText:string
}

let updateTimeout:NodeJS.Timeout;

function NoteTextInput({noteId,startingNoteText}:Props) {
    const noteIdParam = useSearchParams().get("noteId") || ""
    const {noteText,setNoteText} = useNote();


    useEffect(() => {
        if(noteText ===noteId){
            setNoteText(startingNoteText)
        }

    }, [startingNoteText,noteIdParam,setNoteText]);

  return (
    <div className="relative flex items-center justify-center h-screen w-screen">
  {/* Background Patch */}
  <div className="absolute top-0   left-0 bg-green-600  w-36 h-[50px] rounded-lg blur-3xl"></div>

  {/* Text Area */}
  <div className='border'>

  <Textarea
    className="relative z-10 w-full max-w-md p-5 border border-white  rounded-md shadow-md outline-none"
    placeholder="Type your notes here"
    value={noteText}
  />
  </div>
</div>


  )
}

export default NoteTextInput