import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "./App";

type ViewNoteProps = {
    notes: Note[]
}

export function ViewNote({notes}: ViewNoteProps) {
  const {id} = useParams()
  const note = notes.find(note => note.id === id)

  if(!note) return <Navigate to="/" replace/>
  
  return <Outlet context={note}/>
}

export function useNote() {
    return useOutletContext<Note>()
}
