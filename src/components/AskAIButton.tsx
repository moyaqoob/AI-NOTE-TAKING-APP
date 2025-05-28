"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@supabase/supabase-js";
import { Textarea } from "./ui/textarea";
import { Fragment, startTransition, useRef, useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { askAIAboutNotesAction } from "@/actions/notes";

type Props = {
  user: User | null;
};

function AskAIButton({ user }: Props) {
  const [questions,setQuestions]=  useState<string[]>([]);
  const [questionText,setQuestionText] = useState("");
  const [responses,setResponses] = useState<string[]>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isPending,startTransition] = useTransition();
  const [open,setOpen] = useState<boolean>()
   const contentRef = useRef<HTMLDivElement>(null)

  const handleOnOpenChange = (isOpen:boolean)=>{
    if(!user){
      redirect("/")
    }else{
      if(isOpen){
        setQuestionText("")
        setQuestions([])
        setResponses([])
      }
      setOpen(isOpen)
    }
  }

  const handleInput = ()=>{
    const textarea = textAreaRef.current;
    if(!textarea) return;

    textarea.style.height
  }

  const handleClickInput = ()=>{
    textAreaRef.current?.focus;
  }


  const scrollToBottom = ()=>{{
    contentRef.current?.scrollTo({
      top:contentRef.current.scrollHeight,
      behavior:"smooth"
    })
  }}

  const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      handleSubmit();
    }
  }
  const handleSubmit = ()=>{
      if(!questionText.trim()) return;

      const newQuestion = [...questions,questionText]
      setQuestions(newQuestion);
      setQuestionText("");
      setTimeout(scrollToBottom,100);

      startTransition(async()=>{
        const response = await askAIAboutNotesAction({newQuestion, responses});
        setResponses((prev) => [...prev, response]);
      })
  }


  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange} >
      <DialogTrigger className="gap-1 text-xl font-serif border px-3 py-0.5 rounded-md">
        Ask AI
      </DialogTrigger>
      <DialogContent className="bg-black ml-44">
        <DialogHeader>
          <DialogTitle>Ask AI About Your Notes?</DialogTitle>
          <DialogDescription>
            Summarise your notes and ask questions about it !
          </DialogDescription>
        </DialogHeader>
          <div>
              {questions.map((question,index)=>(
                  <Fragment key={index}>
                    <p className="bg-muted ml-auto max-w-[60%]">
                      {question}
                    </p>
                    {
                      responses[index] && (
                        <p
                          className="bot-response text-sm text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: responses[index] }}
                        />
                      )
                    }

                  </Fragment>
              ))}
              {isPending && <p className="animate-pulse text-sm">Thinking</p>}
          </div>

          <div className="mt-auto flex cursor-text flex-col rounded-lg border p-4" onClick={handleClickInput}>
              <Textarea
                ref={textAreaRef}
                placeholder="Ask me anything about your notes"
                className="placeholder:text-muted-foreground resize-none rounded-none 
                bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                  minHeight:"0",
                  lineHeight:"normal",
                }}         
                rows={1}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                value={questionText}       
                onChange={(e) => setQuestionText(e.target.value)}
                />
          </div>
      </DialogContent>
    </Dialog>
  );
}

export default AskAIButton;
