"use client";

import { Note } from '@prisma/client';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from './input';
import { SidebarMenu, SidebarMenuItem, SidebarGroupContent as SideGroupContentShadcn } from './sidebar';
import Fuse from 'fuse.js';
import DeleteNoteItem from './DeleteNoteItem';
import SelectNoteButton from './SelectNoteButton';
import { getUser } from '@/auth/server';

type Props = {
  notes: Note[];
};

function SideBarGroupContent({ notes }: Props) {
  const [searchText, setSearchText] = useState('');
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);

  useEffect(() => {
    setLocalNotes(notes); 
  }, [notes]);

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    if (!localNotes.length) return null;
    return new Fuse(localNotes, {
      keys: ['text'], // Adjust based on your Note structure
      threshold: 0.4, // Sensitivity
    });
  }, [localNotes]);


  // Filtered notes based on search text
  const filteredNotes = useMemo(() => {
    if (!searchText || !fuse){
         console.log("enter the text") 
         return localNotes;
    }
    console.log(searchText)
    return fuse.search(searchText).map((result) => result.item);
  }, [searchText, fuse, localNotes]);

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  return (
    <SideGroupContentShadcn>
      <div className="relative flex items-center">
        <Input
          type="text"
          className="rounded-full mx-3 font-bold flex items-center cursor-pointer"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search your notes..."
        />
      </div>

      <SidebarMenu className="mt-4">
        {filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id}>
            <SelectNoteButton note={note} />
            <DeleteNoteItem
              noteId={note.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SideGroupContentShadcn>
  );
}

export default SideBarGroupContent;
