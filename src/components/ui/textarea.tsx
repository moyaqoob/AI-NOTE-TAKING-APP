import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[30px] w-full rounded-md border-none bg-transparent text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
