"use client";
import {useNote} from "@/hooks/useNote";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, type ChangeEvent } from "react";
import { Textarea } from "./ui/textarea";
import { debounceTimeout } from "@/lib/constants";
import {updateAction} from "@/actions/notes";

type Props = {
  noteId: string;
  startingNoteText: string;
};


function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = useNote();
  const updateTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(()=>{
      setNoteText(startingNoteText)
  },[noteIdParam])

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);
};

 1
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {/* Background Patch */}
      <div className="absolute top-0   left-0 bg-green-600  w-36 h-[50px] rounded-lg blur-3xl"></div>

      {/* Text Area */}
      <div className="border w-full max-w-md px-4 sm:px-6 lg:px-8">
        <Textarea
          className="relative z-10 w-full p-5 border border-white rounded-md shadow-md outline-none sm:p-6 lg:p-8"
          placeholder="Type your notes here"
          value={noteText}
          onChange={handleUpdateNote}
        />
      </div>
    </div>
  );
}

export default NoteTextInput;
