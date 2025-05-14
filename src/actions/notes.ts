"use server"
import { createClient, getUser } from '@/auth/server';
import prisma from '@/prisma/prisma';
import uuid4 from 'uuid4';
export const createNoteAction = async (noteId:string,text:string) => {
    try{
        const user = await getUser();
        if(!user) throw new Error("you must be logged in to update a note")
        await prisma?.note.create({
            data:{
                id:noteId,
                authorId:user.id,
                text:text
            }
        })
        return {errorMessage:null}
    }catch(err){
        throw new Error("error updating action")
    }
};

export const updateAction = async (noteId: string, text: string) => {
    console.log("Updating note with ID:", noteId, "and text:", text);
    
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");

        if (!noteId || !text) {
            throw new Error("Invalid noteId or text");
        }
        console.log("console reached here")

        await prisma?.note.update({
            where: { id: noteId },
            data: { text },
        });
        return { errorMessage: null };
    } catch (err) {
        console.error("Error updating note:", err);
        throw new Error("Error updating action");
    }
};
