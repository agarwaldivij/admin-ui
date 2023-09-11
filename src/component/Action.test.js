import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Actions } from "./Actions";

describe("Actions Component", () => {
  it("renders without errors", () => {
    render(
      <Actions
        id={1}
        onDelete={() => {}}
        isEdit={false}
        editList={[]}
        setEditList={() => {}}
        newValue=""
        onEdit={() => {}}
      />
    );
  });

  it("calls onDelete when Delete button is clicked", () => {
    const onDeleteMock = jest.fn();
    render(
      <Actions
        id={1}
        onDelete={onDeleteMock}
        isEdit={false}
        editList={[]}
        setEditList={() => {}}
        newValue=""
        onEdit={() => {}}
      />
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });

  it("calls onEdit and updates editList when Edit button is clicked", () => {
    const onEditMock = jest.fn();
    const setEditListMock = jest.fn();
    render(
      <Actions
        id={1}
        onDelete={jest.fn()}
        isEdit={false}
        editList={[1, 2]}
        setEditList={setEditListMock}
        newValue="ab"
        onEdit={onEditMock}
      />
    );

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    expect(setEditListMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).not.toHaveBeenCalled();
  });
  it("when done button is clicked", () => {
    const onEditMock = jest.fn();
    const setEditListMock = jest.fn();
    render(
      <Actions
        id={1}
        onDelete={jest.fn()}
        isEdit={true}
        editList={[1, 2]}
        setEditList={setEditListMock}
        newValue="ab"
        onEdit={onEditMock}
      />
    );

    const doneButton = screen.getByTestId("done-button");
    fireEvent.click(doneButton);

    expect(onEditMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).toHaveBeenCalledWith(1, "ab");
  });
});
