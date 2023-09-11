import React, { useEffect, useState } from "react";
import { Table } from "../component/table";
import "./employeeList.css";
import { Pagination } from "../component/pagination";
import ErrorBoundary from "../component/error-boundry";

export const EmployeeList = () => {
  // list of total data and data to be displayed
  const [userList, setUserList] = useState({
    displayList: [],
    listFromApi: [],
  });
  // list of selected data to be deleted
  const [selected, setSelected] = useState([]);
  // presave edited data containing user changes
  const [editedData, setEditiedData] = useState({});
  // list of ids that are in edit mode
  const [edit, setEdit] = useState([]);
  // for setting pagination
  const [pagination, setpagination] = useState({
    offset: 0,
  });
  // for handling loading and on error state
  const [stateHandling, setStateHandling] = useState({
    isLoading: false,
    isError: false,
  });

  // useEffect to store the presaved edited values by user
  useEffect(() => {
    let newObj = {};
    userList.listFromApi.forEach((item) => {
      if (edit.includes(item.id)) {
        newObj = { ...newObj, [item.id]: editedData[item.id] };
      } else {
        newObj = { ...newObj, [item.id]: item };
      }
    });
    setEditiedData(() => newObj);
  }, [userList.listFromApi, edit]);

  // useEffect for API call
  useEffect(() => {
    setStateHandling({ isLoading: true, isError: false });
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserList({ displayList: data, listFromApi: data });
        setStateHandling({ isLoading: false, isError: false });
      })
      .catch(() => {
        setStateHandling({ isLoading: false, isError: true });
      });
  }, []);

  // on edit function
  function onEdit(id, data) {
    const newList = userList.listFromApi.map((item) => {
      if (item.id === id) {
        return data;
      }
      return item;
    });
    setUserList(() => {
      return { listFromApi: newList, displayList: newList };
    });
  }

  // on delete function
  function Delete(ids) {
    const filteredList = userList.listFromApi.filter((item) => {
      return !ids.includes(item.id);
    });
    setUserList(() => {
      return { listFromApi: filteredList, displayList: filteredList };
    });
    setSelected([]);
  }

  // on search funcion
  function search(query) {
    query = query.toLowerCase();
    const filteredList = userList.listFromApi.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
      );
    });
    setpagination(() => {
      return { offset: 0 };
    });

    setUserList(() => {
      return { ...userList, displayList: filteredList };
    });
  }

  //on pagination chnage
  const paginate = (number) => {
    setpagination(() => {
      return { offset: number - 1 };
    });
  };

  return (
    <ErrorBoundary>
      <div className="container">
        {stateHandling.isLoadng ? (
          <div>Loading...</div>
        ) : stateHandling.isError ? (
          <div>Something went wrong!</div>
        ) : (
          <div className="w-full h-full overflow-hidden grid-template-row">
            <div className="w-full search-bar">
              <input
                id="searchbar"
                type="text"
                name="search"
                data-testid="search-bar"
                className="w-full"
                onChange={(event) => search(event.target.value)}
                placeholder="Search by name, email or role"
              />
            </div>
            <Table
              list={userList.displayList.slice(
                pagination.offset * 10,
                pagination.offset * 10 + 10
              )}
              selected={selected}
              setSelected={setSelected}
              editList={edit}
              setEditList={setEdit}
              onDelete={Delete}
              onEdit={onEdit}
              editedData={editedData}
              setEditiedData={setEditiedData}
            />
            <div className="flex">
              <div className="delete-button" onClick={() => Delete(selected)}>
                Delete
              </div>
              <Pagination
                itemsPerPage={10}
                totalItems={userList.displayList.length}
                paginate={paginate}
                currPage={pagination.offset + 1}
              />
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
