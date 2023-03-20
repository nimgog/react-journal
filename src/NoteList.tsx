import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Topic } from "./App";
import styles from "./NoteList.module.css";

type SimplifiedNote = {
  topics: Topic[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTopics: Topic[];
  notes: SimplifiedNote[];
};

export function NoteList({ availableTopics, notes }: NoteListProps) {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      let hasAllTopics = selectedTopics.every((topic) =>
        note.topics.some((noteTopic) => noteTopic.id === topic.id)
      );
      let isTitleEmpty = title.length === 0;
      let isSelectedTopicsEmpty = selectedTopics.length === 0;
      let isMatch = note.title.toLowerCase().includes(title.toLowerCase());

      return (
        (isTitleEmpty || isMatch) && (isSelectedTopicsEmpty || hasAllTopics)
      );
    });
  }, [title, selectedTopics, notes]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>{" "}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
              <Button variant="outline-secondary ml-1"> Edit Topics</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Group controlId="topics">
              <Form.Label>Topics</Form.Label>
              <ReactSelect
                value={selectedTopics.map((topic) => {
                  return { label: topic.label, value: topic.id };
                })}
                options={availableTopics.map((topic) => {
                  return { label: topic.label, value: topic.id };
                })}
                onChange={(topics) => {
                  setSelectedTopics(
                    topics.map((topic) => {
                      return { label: topic.label, id: topic.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} topics={note.topics} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function NoteCard({ id, title, topics }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={` h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {topics.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
                {topics.map(topic => (
                    <Badge className="text-truncate" key={topic.id}>
                        {topic.label}
                    </Badge>
                ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
