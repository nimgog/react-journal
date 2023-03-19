import { FormEvent, useRef, useState } from "react";
import { Col, Row, Stack, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";
import { NoteData, Topic } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTopic: (topic: Topic) => void;
  availableTopics: Topic[];
};

export function NoteForm({
  onSubmit,
  onAddTopic,
  availableTopics,
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      topics: selectedTopics,
    });
    navigate('..')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="topics">
              <Form.Label>Topics</Form.Label>
              <CreateableReactSelect
                onCreateOption={(label) => {
                  const newTopic = { id: uuidV4(), label };
                  onAddTopic(newTopic);
                  setSelectedTopics((prev) => [...prev, newTopic]);
                }}
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
        <Row>
          <Col>
            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control required as="textarea" ref={bodyRef} rows={15} />
            </Form.Group>
          </Col>
        </Row>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            {" "}
            Save{" "}
          </Button>
          <Link to="..">
            <Button type="submit" variant="outline-secondary">
              {" "}
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
