import React, { useEffect, useState } from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import { RxChevronLeft } from "react-icons/rx";

import { axiosPrivate } from "../../config/axios";

import Skeleton from "react-loading-skeleton";

const SearchResultDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState(null);

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
            <h4 data-testid="keyword">
              {searchResult ? searchResult.keyword : <Skeleton width={200} />}
            </h4>

            <span style={{ display: "block" }} data-testid="totalAds">
              <b>Total adwords advertisers: </b>
              {searchResult ? (
                searchResult.totalAdwordsAdvertisers
              ) : (
                <Skeleton width={50} />
              )}
            </span>

            <span style={{ display: "block" }} data-testid="totalLinks">
              <b>Total links: </b>{" "}
              {searchResult ? searchResult.totalLinks : <Skeleton width={50} />}
            </span>

            <span style={{ display: "block" }} data-testid="totalSearchResults">
              <b>Total search results: </b>{" "}
              {searchResult ? (
                searchResult.totalSearchResults
              ) : (
                <Skeleton width={50} />
              )}
            </span>

            <span style={{ display: "block" }} data-testid="htmlCode">
              <b>HTML Code: </b>
              {searchResult ? (
                <textarea
                  className="html-text bg-dark"
                  value={searchResult.htmlCode}
                  readOnly
                />
              ) : (
                <Skeleton className="html-text" />
              )}
            </span>
          </Card.Body>
        </Card>
      </Accordion>
    </Container>
  );
};

export default SearchResultDetail;
