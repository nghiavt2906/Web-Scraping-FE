import React, { useEffect, useState } from "react";
import {
  Accordion,
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";

import { axiosPrivate } from "../../config/axios";
import KeywordsListGroup from "../../components/KeywordsListGroup/KeywordsListGroup";
import EmptyState from "../../components/EmptyState/EmptyState";

const SearchReports = () => {
  const [reports, setReports] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/reports/all");
        setReports(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleClick = () => setSearchText("");

  return (
    <Container className="px-3 py-3">
      <InputGroup className="mb-3" style={{ width: "30rem" }}>
        <FormControl
          id="searchKeywords"
          placeholder="Your keywords"
          type="text"
          onChange={handleChange}
          value={searchText}
        />
        <Button onClick={handleClick} variant="danger">
          Clear
        </Button>
      </InputGroup>

      <Card>
        <Card.Header className="text-dark fw-semibold">
          Your reports
        </Card.Header>
        <Card.Body>
          {reports.length > 0 ? (
            <Accordion>
              {reports.map((report) => (
                <Accordion.Item key={report.id} eventKey={report.id}>
                  <Accordion.Header>{report.name}</Accordion.Header>
                  <Accordion.Body>
                    <KeywordsListGroup
                      searchResults={report.keywords}
                      searchText={searchText}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <EmptyState />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SearchReports;
