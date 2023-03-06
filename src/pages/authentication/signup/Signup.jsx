import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Card, Alert } from "react-bootstrap";

import { signupRequest } from "../../../store/actions/user";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user.authenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, password };

    if (username.length === 0 || password.length === 0) {
      setError("Username and password are required!");
      return;
    }

    if (password.length < 6) {
      setError("Length of password must be at least 6 characters!");
      return;
    }

    try {
      dispatch(signupRequest(data, navigate));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      style={{
        width: "38rem",
        color: "white",
        margin: "5rem auto",
      }}
      className="text-dark"
    >
      <Card.Header style={{ textAlign: "center" }}>
        <h4>Create a new account</h4>
      </Card.Header>
      <Card.Body>
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

          <div className="row justify-content-center">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "10rem", height: "3rem" }}
            >
              Sign up
            </Button>

            <span style={{ textAlign: "center", marginTop: "1rem" }}>
              Already have an accout?{" "}
              <a href="/login" style={{ textDecoration: "none" }}>
                Go to login
              </a>
            </span>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Signup;
