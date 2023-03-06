import React from "react";

import emptyState from "../../assets/empty-state.png";

const EmptyState = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      <img
        src={emptyState}
        alt="No results found"
        style={{ height: "300px", marginBottom: "2rem" }}
      />
      <span className="text-secondary fs-4 fw-bold">No results found</span>
    </div>
  );
};

export default EmptyState;
