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

import Skeleton from "react-loading-skeleton";

import KeywordsListGroup from "../../components/KeywordsListGroup/KeywordsListGroup";
import EmptyState from "../../components/EmptyState/EmptyState";

const SearchReports = () => {
  const [reports, setReports] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/reports/all");
        setReports(response.data);
        setIsLoading(false);
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
          placeholder="Search your keywords"
          type="text"
          onChange={handleChange}
          value={searchText}
          data-testid="search-keywords-input"
        />
        <Button
          onClick={handleClick}
          variant="danger"
          data-testid="clear-button"
        >
          Clear
        </Button>
      </InputGroup>

      <Card>
        <Card.Header className="text-dark fw-semibold">
          Your reports
        </Card.Header>
        <Card.Body>
          {reports.length > 0 ? (
            <Accordion data-testid="display-reports">
              {reports.map((report) => (
                <Accordion.Item
                  key={report.id}
                  eventKey={report.id}
                  data-cy={`report-${report.id}`}
                >
                  <Accordion.Header>{`${report.name}.csv`}</Accordion.Header>
                  <Accordion.Body>
                    <KeywordsListGroup
                      searchResults={report.searchResults}
                      searchText={searchText}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : isLoading ? (
            <Accordion data-testid={"loading-reports"}>
              {[...Array(7).keys()].map((key) => (
                <Skeleton key={key} width={"100%"} height={"3.4rem"} />
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
