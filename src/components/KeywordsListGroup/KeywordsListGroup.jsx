import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import getBadgeClass from "../../utils/getBadgeClass";

import SEARCH_STATUS from "../../constants/search_status";

const KeywordsListGroup = ({ searchResults, searchText }) => {
  const navigate = useNavigate();

  const handleClickListItem = (id) => {
    navigate(`/search-results/${id}`);
  };

  let filteredSearchResults = searchResults;
  if (searchText && searchText.length > 0) {
    filteredSearchResults = searchResults.filter((searchResult) =>
      searchResult.keyword.toLowerCase().match(searchText.toLowerCase())
    );
  }

  return (
    <ListGroup
      as="ol"
      numbered
      style={{
        overflowY: "auto",
        maxHeight: "450px",
      }}
      data-cy="processing-keywords-list"
    >
      {filteredSearchResults.map((searchResult) => (
        <ListGroup.Item
          key={searchResult.id}
          action
          as="li"
          className="d-flex justify-content-between align-items-start"
          disabled={searchResult.status === SEARCH_STATUS.PROCESSING}
          onClick={() => handleClickListItem(searchResult.id)}
        >
          <div className="ms-2 me-auto">{searchResult.keyword}</div>
          <Badge bg={getBadgeClass(searchResult.status)}>
            {searchResult.status}
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default KeywordsListGroup;
