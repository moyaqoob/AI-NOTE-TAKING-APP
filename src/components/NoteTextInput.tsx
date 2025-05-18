"use client";
import { useNote } from "@/hooks/useNote";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { updateAction } from "@/actions/notes";

type Props = {
  noteId: string;
  startingNoteText: string;
};

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = useNote();

  useEffect(() => {
    setNoteText(startingNoteText);
  }, [noteIdParam]);

  const handleUpdateNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setNoteText(text);
    updateAction(noteIdParam,noteText)
  };


  
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <div className="absolute top-0 brightness-105  left-0 bg-green-600  w-36 h-[50px] rounded-lg blur-3xl"></div>

      <div className="relative w-full max-w-md px-4 sm:px-6 lg:px-8">
        <Textarea
          className="relative z-10 w-full h-full p-5 border border-white rounded-md shadow-lg shadow-white outline-none sm:p-6 lg:p-8"
          placeholder="Type your notes here"
          value={noteText}
          onChange={handleUpdateNote}
        />
        
      </div>
    </div>
  );
}

export default NoteTextInput;
