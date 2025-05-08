import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";

type Props = {
  searchParams: Promise<{[Key: string]: string | string[] | undefined}>
}


async function Home({searchParams}: Props) {
  const noteIdParam = (await searchParams).noteId
  const user = getUser();

  const noteId = Array.isArray(noteIdParam)
  ? noteIdParam![0] : noteIdParam || " "
  
  return (
    <div className="flex flex-col items-center fixed justify-center w-full h-full space-y-6">
  {/* Buttons Section */}
  <div className="flex items-center space-x-4">
    <AskAIButton user={user} />
    <NewNoteButton user={user} />
  </div>
      <NoteTextInput noteId={noteId} startingNoteText={noteId || ""} />
  </div>

  );
}

export default Home;
