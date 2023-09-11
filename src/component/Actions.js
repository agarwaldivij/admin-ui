import React from "react";
import { DeleteOutlined, ModeEditOutline, Done } from "@mui/icons-material";
import ErrorBoundary from "./error-boundry";

export const Actions = ({
  id,
  onDelete,
  isEdit,
  editList,
  setEditList,
  newValue,
  onEdit,
}) => {
  return (
    <ErrorBoundary>
      <div className="Actions">
        <DeleteOutlined
          sx={{ color: "red" }}
          onClick={() => onDelete(id)}
          data-testid="delete-button"
        />
        {isEdit ? (
          <Done
            data-testid="done-button"
            onClick={() => {
              // when user done editing
              onEdit(id, newValue);
              setEditList(() => {
                return editList.filter((item) => item !== id);
              });
            }}
          />
        ) : (
          <ModeEditOutline
            onClick={() => {
              // when user select to edit
              setEditList(() => [...editList, id]);
            }}
            data-testid="edit-button"
          />
        )}
      </div>
    </ErrorBoundary>
  );
};
