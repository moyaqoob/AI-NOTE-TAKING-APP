import NoteProvider, { NoteProviderContext } from '@/providers/note-provider'
import React, { useContext } from 'react'

function useNote() {
    const context = useContext(NoteProviderContext)

    if(!context) return console.error("cant able to find the context");

    return context;
}

export default useNote