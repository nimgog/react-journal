import { NoteData, Topic } from "./App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTopic: (topic: Topic) => void
    availableTopics: Topic[]
}

export function NewNote({ onSubmit, onAddTopic, availableTopics}: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTopic={onAddTopic} availableTopics={availableTopics}/>
    </>
  );
}
