import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Container,
  Form,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";

import { axiosPrivate } from "../../config/axios";

import EmptyState from "../../components/EmptyState/EmptyState";

import { uploadFileRequest } from "../../store/actions/report";
import getBadgeClass from "../../utils/getBadgeClass";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { submittedReport } = useSelector((state) => state.user);

  const [file, setFile] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const successResults = searchResults.filter(
    (searchResult) => searchResult.status === "SUCCESS"
  ).length;

  useEffect(() => {
    const updateInterval = setInterval(async () => {
      try {
        const response = await axiosPrivate.get(
          `/reports/${submittedReport.id}/search-results`
        );
        setSearchResults(response.data);
      } catch (error) {}
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [submittedReport]);

  const handleChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    dispatch(uploadFileRequest(file));
  };

  const handleClickListItem = () => {
    navigate("/test");
  };

  return (
    <>
      <Container className="mt-3 px-3 py-3">
        <h3>Upload</h3>

        <Form className="my-3" onSubmit={handleSubmit}>
          <div className="row mb-1">
            <div className="col-md-4">
              <input
                className="form-control"
                type="file"
                onChange={handleChange}
              />
            </div>

            <div
              className="col-md-2"
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "flex-end",
              }}
            >
              <Button className="btn btn-primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>

        <Accordion>
          <Card>
            <Card.Header className="text-dark fw-semibold">
              <div className="d-flex align-items-center justify-content-between">
                Processing Keywords
                <div className="d-flex align-items-center ml-3">
                  {successResults}/{searchResults.length}
                  <ProgressBar
                    animated
                    variant="success"
                    now={(successResults * 100) / searchResults.length}
                    style={{ width: "20rem", marginLeft: "0.5rem" }}
                  />
                </div>
              </div>
            </Card.Header>
            <Card.Body style={{ backgroundColor: "#F9F9FB", height: "500px" }}>
              {searchResults.length > 0 ? (
                <ListGroup
                  as="ol"
                  numbered
                  style={{
                    overflowY: "auto",
                    maxHeight: "450px",
                  }}
                >
                  {searchResults.map((searchResult) => (
                    <ListGroup.Item
                      key={searchResult.id}
                      action
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      disabled={searchResult.status === "PROCESSING"}
                      onClick={handleClickListItem}
                    >
                      <div className="ms-2 me-auto">{searchResult.keyword}</div>
                      <Badge bg={getBadgeClass(searchResult.status)}>
                        {searchResult.status}
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <EmptyState />
              )}
            </Card.Body>
          </Card>
        </Accordion>
      </Container>
    </>
  );
};

export default Home;
