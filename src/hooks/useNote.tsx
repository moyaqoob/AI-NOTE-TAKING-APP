import  { NoteProviderContext, type NoteProviderContextType } from '@/providers/note-provider'
import { useContext } from 'react'

export const useNote = (): NoteProviderContextType => {
    const context = useContext(NoteProviderContext);
    if (!context) {
      throw new Error("useNote must be used within a NoteProvider");
    }
    return context;
};