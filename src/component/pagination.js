import React from "react";
import "./paginaiton.css";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import ErrorBoundary from "./error-boundry";

export const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currPage,
}) => {
  const pageNumbers = [];

  // to get total count of page numbers
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ErrorBoundary>
      <nav className="w-full">
        <div className="pagination w-full">
          <div
            onClick={() => paginate(currPage - 1)}
            disabled={currPage === 1}
            data-testid="prev-button"
            className="arrow-buttons"
          >
            <ArrowBack />
          </div>
          {pageNumbers.map((number) => (
            <div
              key={number}
              className={`page-item ${
                currPage === number ? "active" : "inactive"
              }`}
              onClick={() => paginate(number)}
              data-testid={`page-${number}`}
            >
              {number}
            </div>
          ))}
          <div
            onClick={() => {
              if (pageNumbers.length !== currPage) paginate(currPage + 1);
            }}
            data-testid="next-button"
            className="arrow-buttons"
          >
            <ArrowForward />
          </div>
        </div>
      </nav>
    </ErrorBoundary>
  );
};
