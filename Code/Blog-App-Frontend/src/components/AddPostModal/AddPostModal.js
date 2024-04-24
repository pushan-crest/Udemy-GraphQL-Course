import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation PostCreate($title: String!, $content: String!) {
    postCreate(post: { title: $title, content: $content }) {
      userErr {
        message
      }
      post {
        title
        id
        content
        Published
        createdAt
        author {
          name
        }
      }
    }
  }
`;

export default function AddPostModal() {
  const [show, setShow] = useState(false);

  const [createPost, { data, loading }] = useMutation(CREATE_POST);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.postCreate.userErr.length) {
        setError(data.postCreate.userErr[0].message);
      }
      if (data.postCreate.token) {
        localStorage.setItem("token", data.postCreate.token);
        window.location.href = "/profile/2";
      }
    }
  }, [data]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleClick = () => {
    if (!title || !content) {
      return;
    } else {
      createPost({
        variables: {
          title: title,
          content: content,
        },
      });
      handleClose();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error && <p>{error}</p>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
