import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const SIGNUP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $bio: String!
    $name: String!
  ) {
    signUp(
      credentials: { password: $password, email: $email }
      name: $name
      bio: $bio
    ) {
      userErr {
        message
      }
      token
      message
    }
  }
`;

export default function Signup() {
  const [signUp, { data, loading }] = useMutation(SIGNUP);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleClick = () => {
    signUp({
      variables: {
        email: email,
        password: password,
        bio: bio,
        name: name,
      },
    });
  };

  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signUp.userErr.length) {
        setError(data.signUp.userErr[0].message);
      }
      if (data.signUp.token) {
        localStorage.setItem("token", data.signUp.token);
        window.location.href = "/posts";
      }
    }
  }, [data]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signup</Button>
      </Form>
    </div>
  );
}
