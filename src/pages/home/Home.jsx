import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container, Form, ProgressBar } from "react-bootstrap";

import { axiosPrivate } from "../../config/axios";

import EmptyState from "../../components/EmptyState/EmptyState";
import KeywordsListGroup from "../../components/KeywordsListGroup/KeywordsListGroup";

import {
  disableSubmitButton,
  enableSubmitButton,
  uploadFileRequest,
} from "../../store/actions/report";

import toaster from "../../config/toaster";

import SEARCH_STATUS from "../../constants/search_status";
import TOAST_TYPES from "../../constants/toast_types";

const Home = () => {
  const dispatch = useDispatch();

  const { submittedReport, isProcessing } = useSelector((state) => state.user);

  const [file, setFile] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const successResults = searchResults.filter(
    (searchResult) => searchResult.status === SEARCH_STATUS.SUCCESS
  ).length;

  if (
    isProcessing &&
    successResults > 0 &&
    successResults === searchResults.length
  ) {
    dispatch(enableSubmitButton());
  }

  useEffect(() => {
    const updateInterval = setInterval(async () => {
      if (!submittedReport) return;

      try {
        const response = await axiosPrivate.get(
          `/reports/${submittedReport.id}/search-results`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log(error);
      }
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
      toaster.show("CSV file is required!", TOAST_TYPES.ERROR);
      return;
    }

    if (file.name.split(".").pop() !== "csv") {
      toaster.show("File format must be CSV!", TOAST_TYPES.ERROR);
      return;
    }

    setSearchResults([]);
    dispatch(disableSubmitButton());
    dispatch(uploadFileRequest(file));
  };

  return (
    <>
      <Container className="mt-3 px-3 py-3">
        <h3 data-cy="home-title">Upload</h3>

        <Form className="my-3" onSubmit={handleSubmit}>
          <div className="row mb-1">
            <div className="col-md-4">
              <input
                className="form-control"
                type="file"
                onChange={handleChange}
                data-testid="file-input"
                data-cy="file-input"
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
              <Button
                className="btn btn-primary"
                type="submit"
                disabled={isProcessing}
                data-cy="file-submit-btn"
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>

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
              <KeywordsListGroup searchResults={searchResults} />
            ) : (
              <EmptyState />
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;
