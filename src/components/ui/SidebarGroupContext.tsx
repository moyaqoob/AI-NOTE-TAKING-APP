"use client"

import {Note} from '@prisma/client'
import React, { useEffect, useMemo, useRef } from 'react'
import { Input } from './input'
import { SidebarMenu, SidebarMenuItem, SidebarGroupContent as SideGroupContentShadcn } from './sidebar'
import Fuse from "fuse.js"
import DeleteNoteItem from './DeleteNoteItem'
import SelectNoteButton from './SelectNoteButton'

type Props = {
    notes:Note[]
}

function SideBarGroupContent({notes}:Props) {
  const [searchText,setSearchText] = React.useState("");
  const [localNotes,setLocalNotes] = React.useState(notes)

  useEffect(()=>{
    setLocalNotes(notes)
  },[notes])

  const fuse = useMemo(()=>{
    return new Fuse(localNotes,{
      keys:['text'],
      threshold:.4 
    })
  },[localNotes])


  const filteredNotes = searchText ? fuse.search(searchText).map(result=>{
   console.log(result+ "here")
    return result.item}) : localNotes;
  
    const deleteNoteLocally = (noteId:string)=>{
    setLocalNotes((item)=>
      item.filter((note)=>note.id!==noteId)
    )
  }


  return (
    <SideGroupContentShadcn>
        <div className='relative flex items-center'>
          <Input
          type='text'
            className='rounded-full mx-3 font-bold  bg-gray-900 flex items-center cursor-pointer'
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            placeholder='Search your notes...'
          />
        </div>

        <SidebarMenu className='mt-4'>
            {filteredNotes.map((note)=>(
              <SidebarMenuItem key={note.id}>
                <h1>hiojpo</h1>
                  <SelectNoteButton note={note}/>

                  <DeleteNoteItem note={note}
                    deleteNoteLocally={deleteNoteLocally}
                  />
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
    </SideGroupContentShadcn>
  )
}

export default SideBarGroupContent