import React, { useEffect, useState } from "react";
import { Accordion, Card, Container, Modal, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import { RxChevronLeft } from "react-icons/rx";

import { axiosPrivate } from "../../config/axios";

import Skeleton from "react-loading-skeleton";

const SearchResultDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get(`/search-results/${id}`);
      setSearchResult(response.data);
    };
    fetchData();
  }, []);

  const handleBackBtn = () => navigate(-1);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
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
              <h4>
                {searchResult ? searchResult.keyword : <Skeleton width={200} />}
              </h4>

              <span style={{ display: "block" }}>
                <b>Total adwords advertisers: </b>
                {searchResult ? (
                  searchResult.totalAdwordsAdvertisers
                ) : (
                  <Skeleton width={50} />
                )}
              </span>

              <span style={{ display: "block" }}>
                <b>Total links: </b>{" "}
                {searchResult ? (
                  searchResult.totalLinks
                ) : (
                  <Skeleton width={50} />
                )}
              </span>

              <span style={{ display: "block" }}>
                <b>Total search results: </b>{" "}
                {searchResult ? (
                  searchResult.totalSearchResults
                ) : (
                  <Skeleton width={50} />
                )}
              </span>

              <span style={{ display: "block" }}>
                <b>HTML Code: </b>
                <Button
                  variant="primary"
                  onClick={handleShowModal}
                  disabled={!searchResult}
                >
                  View HTML content
                </Button>
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

      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>HTML Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ maxWidth: "100%" }}
            dangerouslySetInnerHTML={{
              __html: searchResult ? searchResult.htmlCode : "",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchResultDetail;
