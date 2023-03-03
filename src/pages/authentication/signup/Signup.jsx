import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, password };

    if (username.length === 0 || password.length === 0) {
      setError("Username and password are required!");
      return;
    }

    if (password.length < 6) {
      setError("Length of password must contain at least 6 characters!");
      return;
    }

    try {
      // post signup
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      style={{
        width: "38rem",
        color: "white",
        margin: "4rem auto",
        backgroundColor: "#242424",
      }}
    >
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          Create a new account
        </Card.Title>

        {error.length > 0 ? (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            <Alert.Heading>please check again.</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : null}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div class="row justify-content-center">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "10rem", height: "3rem" }}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Signup;
