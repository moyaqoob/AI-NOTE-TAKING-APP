"use client";

import { Note } from "@prisma/client";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import DeleteNoteItem from "./DeleteNoteItem";
import { Input } from "./input";
import SelectNoteButton from "./SelectNoteButton";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupContent as SideGroupContentShadcn,
} from "./sidebar";

type Props = {
  notes: Note[];
};

function SideBarGroupContent({ notes }: Props) {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    if (!localNotes.length) return null;
    return new Fuse(localNotes, {
      keys: ["text"], // Adjust based on your Note structure
      threshold: 0.4, // Sensitivity
    });
  }, [localNotes]);

  // Filtered notes based on search text
  const filteredNotes = useMemo(() => {
    if (!searchText || !fuse) {
      return localNotes;
    }
    return fuse.search(searchText).map((result) => result.item);
  }, [searchText, fuse, localNotes]);

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  return (
    <SideGroupContentShadcn className="p-6 bg-orange-900 rounded-xl shadow-lg border border-blue-700">
  {/* Search Bar */}
  <div className="relative flex items-center mb-6">
    <Input
      type="text"
      className="rounded-full px-4 py-2 w-full font-medium bg-pink-950 text-black placeholder-gray-500 border border-gray-700 focus:ring-2 focus:ring-pink-900 shadow-md focus:outline-none"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search your notes..."
    />
  </div>

  {/* Notes List */}
  <SidebarMenu className="mt-6 space-y-4">
    {filteredNotes.map((note) => (
      <SidebarMenuItem
        key={note.id}
        className="flex items-center justify-between p-4 bg-yellow-800 text-cyan-600 text-md font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 shadow-sm"
      >
        <SelectNoteButton note={note} />
        <DeleteNoteItem
          noteId={note.id}
          deleteNoteLocally={deleteNoteLocally}
        />
      </SidebarMenuItem>
    ))}
  </SidebarMenu>

  {/* No Notes Found */}
  {filteredNotes.length === 0 && (
    <div className="text-center text-gray-500 mt-6 italic">
      No notes found. Try searching for something else.
    </div>
  )}
</SideGroupContentShadcn>
  )
}

export default SideBarGroupContent;
