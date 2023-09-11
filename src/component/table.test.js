import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Table } from "./table";

describe("Table Component", () => {
  const sampleData = [
    { id: 1, name: "John", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Alice", email: "alice@example.com", role: "User" },
  ];

  const defaultProps = {
    list: sampleData,
    selected: [],
    setSelected: () => {},
    onDelete: () => {},
    editList: [],
    setEditList: () => {},
    onEdit: () => {},
    editedData: {},
    setEditiedData: () => {},
  };

  it("renders without errors", () => {
    const { container } = render(<Table {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("renders the correct number of rows", () => {
    render(<Table {...defaultProps} />);
    const rows = screen.getAllByTestId(/^select-\d+$/);
    expect(rows).toHaveLength(sampleData.length);
  });

  it("calls setSelected when selecting all items", () => {
    const setSelectedMock = jest.fn();
    render(<Table {...defaultProps} setSelected={setSelectedMock} />);

    const selectAllCheckbox = screen.getByTestId("select-all");
    fireEvent.click(selectAllCheckbox);

    expect(setSelectedMock).toHaveBeenCalledTimes(1);
  });

  it("calls setSelected when selecting individual items", () => {
    const setSelectedMock = jest.fn();
    render(<Table {...defaultProps} setSelected={setSelectedMock} />);

    const selectItemCheckbox = screen.getByTestId("select-1"); // Selecting the first item
    fireEvent.click(selectItemCheckbox);

    expect(setSelectedMock).toHaveBeenCalledTimes(1);
  });

  // Add more test cases for editing and other interactions as needed
});
