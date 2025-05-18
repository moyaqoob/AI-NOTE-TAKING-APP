import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { deleteNoteAction } from "@/actions/notes";
import { useTransition } from "react";
import { getUser } from "@/auth/server";


type Props = {
  noteId: string | number;
  deleteNoteLocally: (noteId: string) => void;
};


const DeleteNoteItem = ({ noteId, deleteNoteLocally }: Props) => {
  const router = useRouter();
  const noteIdParam = useSearchParams().get("noteId") || "";
  const [isPending,startTransition] = useTransition()
  
  
  const handleDeleteNote =()=>{
    startTransition(async ()=>{
      const {errorMessage} = await deleteNoteAction(noteIdParam)
  
      if(!errorMessage){
        toast('note deleted successfully',{
          description:"Note deleted",
          duration:300
        })
        console.log("here reached here")
        deleteNoteLocally(noteIdParam)
        router.replace("/")
      }
    })
    router.push("/")
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild >
        <Button className="absolute right-2 top-1/2 size-7 top opacity-0 group-hover:opacity-100 flex translate-y-1/4" variant={"ghost"}>
          <Trash2/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you wanna delete this note?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteNote} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNoteItem;
