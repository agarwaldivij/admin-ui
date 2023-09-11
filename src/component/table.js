import React from "react";
import { Actions } from "./Actions";
import "./table.css";
import ErrorBoundary from "./error-boundry";

export const Table = ({
  list,
  selected,
  setSelected,
  onDelete,
  editList,
  setEditList,
  onEdit,
  editedData,
  setEditiedData,
}) => {
  // when user make a change in input fields
  const handleChange = (value, key, item) => {
    setEditiedData(() => {
      return {
        ...editedData,
        [item.id]: { ...editedData[item.id], [key]: value },
      };
    });
  };
  return (
    <ErrorBoundary>
      <div className="w-full h-full overflow-auto">
        <table className="w-full">
          <tr className="table-head">
            <th>
              <input
                value="test"
                type="checkbox"
                className="checkbox"
                data-testid="select-all"
                checked={selected.length === list.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected(() => {
                      return list.map((item) => item.id);
                    });
                  } else {
                    setSelected(() => {
                      return [];
                    });
                  }
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>

          {list.map((item) => {
            const isInput = editList.includes(item.id);
            return (
              <tr
                key={item.id}
                className={`${selected.includes(item.id) ? "active-row" : ""}`}
              >
                <td>
                  <input
                    value="test"
                    type="checkbox"
                    className="checkbox"
                    data-testid={`select-${item.id}`}
                    checked={selected.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelected(() => {
                          return [...selected, item.id];
                        });
                      } else {
                        const filtered = selected.filter(
                          (check) => check !== item.id
                        );
                        setSelected(() => {
                          return [...filtered];
                        });
                      }
                    }}
                  />
                </td>
                <td>
                  {isInput ? (
                    <input
                      type="text"
                      data-testid={`name-${item.id}`}
                      value={editedData[item.id]?.name}
                      onChange={(e) =>
                        handleChange(e.target.value, "name", item)
                      }
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {isInput ? (
                    <input
                      type="text"
                      value={editedData[item.id]?.email}
                      data-testid={`email-${item.id}`}
                      onChange={(e) =>
                        handleChange(e.target.value, "email", item)
                      }
                    />
                  ) : (
                    item.email
                  )}
                </td>
                <td>
                  {isInput ? (
                    <input
                      type="text"
                      data-testid={`role-${item.id}`}
                      value={editedData[item.id]?.role}
                      onChange={(e) =>
                        handleChange(e.target.value, "role", item)
                      }
                    />
                  ) : (
                    item.role
                  )}
                </td>
                <td>
                  <Actions
                    id={item.id}
                    onDelete={onDelete}
                    editList={editList}
                    setEditList={setEditList}
                    newValue={editedData[item.id] ? editedData[item.id] : item}
                    onEdit={onEdit}
                    isEdit={isInput}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </ErrorBoundary>
  );
};
