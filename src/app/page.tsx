import { getUser } from "@/actions/server";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import prisma from "@/prisma/prisma";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });

  return (
    <div className="flex h-[92vh] bg-gradient-to-b from-[#1a2a6c] to-[#2d9cd7]  flex-col items-center -mt-10 gap-8  text-gray-200 ">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl shadow-blue-500/50 animate-shine font-bold text-shadow-gray-950 shiny pt-7">Welcome to AI Notes</h1>
        <p className="text-lg text-gray-400">
          Your personal AI-powered note-taking assistant.
        </p>
      </div>

      {/* Button Section */}
      <div className="flex w-full max-w-4xl justify-end gap-4">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>

      {/* Note Input Section */}
        <NoteTextInput
          noteId={noteId || ""}
          startingNoteText={note?.text || ""}
        />
    </div>
  );
}

export default HomePage;
