"use client";
import { createNoteAction } from "@/actions/notes";
import { debounceTimeout } from "@/lib/constants";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import uuid4 from "uuid4";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useNote } from "@/hooks/useNote";
type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const [loading, setloading] = useState<boolean | undefined>(false);

  const router = useRouter();
  const {noteText}  = useNote();

  const handleClickNewNote = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setloading(true);
      const savingToast = toast("Saving current note", {
        duration: 3000,
        description: "Please wait while your data is being saved",
      });

      await new Promise((resolve) =>
        setTimeout(resolve, debounceTimeout + 500)
      );

      const uuid = uuid4();
      await createNoteAction(uuid,noteText);
      console.log(uuid)
      router.push(`/?noteId=${uuid}`);

      toast.dismiss(savingToast);

      toast.success("New note created", {
        description: "You  have created a new note",
        duration: 3000,
      });

      setloading(false);
    }
  };

  return (
    <Button 
    onClick={handleClickNewNote}
    variant={"secondary"}
    disabled={loading}
    className ="text-lg xl:text-md border duration-75 transition-all hover:bg-red-500 hover:duration-200  ">
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;

