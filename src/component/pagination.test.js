import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Pagination } from "./pagination";

describe("Pagination Component", () => {
  it("renders without errors", () => {
    const { container } = render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        paginate={() => {}}
        currPage={1}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("renders the correct number of page items", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        paginate={() => {}}
        currPage={1}
      />
    );
    // Assuming there are 10 items per page, so there should be 10 page items.
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByTestId(`page-${i}`)).toBeInTheDocument();
    }
  });

  it("calls the paginate function when a page item is clicked", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        paginate={paginateMock}
        currPage={1}
      />
    );

    // Click on page 2
    const pageTwo = screen.getByTestId("page-2");
    fireEvent.click(pageTwo);

    expect(paginateMock).toHaveBeenCalledTimes(1);
    expect(paginateMock).toHaveBeenCalledWith(2);
  });

  it("disables the previous button on the first page", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        paginate={paginateMock}
        currPage={1}
      />
    );

    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
  });

  it("enables the previous button on a page other than the first page", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        paginate={paginateMock}
        currPage={3}
      />
    );

    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);

    expect(paginateMock).toHaveBeenCalledTimes(1);
    expect(paginateMock).toHaveBeenCalledWith(2);
  });

  it("calls the paginate function when the next button is clicked", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        paginate={paginateMock}
        currPage={1}
      />
    );

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    expect(paginateMock).toHaveBeenCalledTimes(1);
    expect(paginateMock).toHaveBeenCalledWith(2);
  });

  it("disables the next button on the last page", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        paginate={paginateMock}
        currPage={10}
      />
    );

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    expect(paginateMock).not.toHaveBeenCalled();
  });
});
