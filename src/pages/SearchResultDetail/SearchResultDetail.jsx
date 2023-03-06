import React, { useEffect, useState } from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import { RxChevronLeft } from "react-icons/rx";

import { axiosPrivate } from "../../config/axios";

const SearchResultDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get(`/search-results/${id}`);
      setSearchResult(response.data);
    };
    fetchData();
  }, []);

  const handleBackBtn = () => navigate(-1);

  return (
    <Container className="px-3 py-3">
      <div className="back-btn" onClick={handleBackBtn}>
        <RxChevronLeft /> Back
      </div>
      <Accordion>
        <Card className="text-dark">
          <Card.Header className="fw-semibold">
            Search result information
          </Card.Header>
          <Card.Body>
            <h4>{searchResult.keyword}</h4>
            <span>
              <b>Total adwords advertisers: </b>
              {searchResult.totalAdwordsAdvertisers}
            </span>{" "}
            <br />
            <span>
              <b>Total links: </b> {searchResult.totalLinks}
            </span>{" "}
            <br />
            <span>
              <b>Total search results: </b> {searchResult.totalSearchResults}
            </span>{" "}
            <br />
            <b>HTML Code: </b>
            <textarea className="html-text" value={searchResult.htmlCode} />
          </Card.Body>
        </Card>
      </Accordion>
    </Container>
  );
};

export default SearchResultDetail;
