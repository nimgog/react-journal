import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNote } from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./NoteList";
import { ViewNote } from "./ViewNote";
import { Note } from "./Note";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  body: string;
  topics: Topic[];
};

export type Topic = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  body: string;
  topicIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [topics, setTopics] = useLocalStorage<Topic[]>("TOPICS", []);

  const notesWithTopics = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        topics: topics.filter((topic: Topic) =>
          note.topicIds.includes(topic.id)
        ),
      };
    });
  }, [notes, topics]);

  function onCreateNote({ topics, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), topicIds: topics.map((topic) => topic.id) },
      ];
    });
  }

  function addTopic(topic: Topic) {
    setTopics((prev) => [...prev, topic]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTopics={topics} notes={notesWithTopics} />} />
        <Route
          path="/new"
          element={<NewNote onAddTopic={addTopic} onSubmit={onCreateNote} availableTopics={topics}/>}
        />
        <Route path="/:id" element={<ViewNote notes={notesWithTopics}/>}>
          <Route index element={<Note />}></Route>
          <Route path="edit" element={<h1>Edit</h1>}></Route>
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
