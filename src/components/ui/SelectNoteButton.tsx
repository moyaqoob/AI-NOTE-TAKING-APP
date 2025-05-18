import React, { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useNote } from "@/hooks/useNote"; // Assuming useNote is defined in your hooks
import { SidebarMenuButton } from "./sidebar";
import Link from "next/link";

type Props = {
  note: Note;
};

const SelectNoteButton: React.FC<Props> = ({ note }) => {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("noteId") || "";

  const [localNoteText, setLocalNoteText] = useState(note.text);
  const { noteText } = useNote();
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (noteId === note.id) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (isCorrect && noteText) {
      setLocalNoteText(noteText);
    }
  }, [isCorrect, noteText]);

  const blankNote = "Empty Note ..";
  const displayedText = localNoteText || blankNote;

  return (
    <SidebarMenuButton
      asChild
      className={`items-center gap-0 flex ${
        isCorrect && "bg-accent-50"
      } transition-all duration-300`}
    >
      <Link href={`?noteId=${note.id}`} className="flex flex-col h-fit">
        <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
          {displayedText}
        </p>
        <p className="text-xs">
          {new Date(note.updatedAt).toLocaleTimeString().toLowerCase()} 
        </p>
      </Link>
    </SidebarMenuButton>
  );
};

export default SelectNoteButton;
