import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNote } from "./ViewNote";
import ReactMarkdown from "react-markdown"
export function Note() {
  const note = useNote();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.topics.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="flex-wrap"
            >
              {note.topics.map((topic) => (
                <Badge className="text-truncate" key={topic.id}>
                  {topic.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={3} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
              <Button variant="outline-danger ml-1">Delete</Button>
              <Link to={'/'}>
              <Button variant="outline-secondary ml-1">Back</Button>
              </Link>
          </Stack>
        </Col>
      </Row>

      <ReactMarkdown>{note.body}</ReactMarkdown>


    </>
  );
}
