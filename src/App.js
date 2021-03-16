import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.scss";
import List from "./components/List";

function App() {
  const [lists, setLists] = useState([]);
  const [input, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    setLists(JSON.parse(localStorage.getItem("localStorageList")) || []);
  }, []);

  const addHandle = (e) => {
    e.preventDefault();
    if (isEdit) {
      const newList = lists.map((list) => {
        if (list.id === editID) {
          return { ...list, task: input };
        } else {
          return list;
        }
      });
      setLists(newList);
      setToLocalStorage(newList);
      setIsEdit(false);
    } else {
      const list = [...lists, { id: uuid(), task: input, done: false }];
      setLists(list);
      setToLocalStorage(list);
    }
    setInput("");
  };

  const deleteHandle = (id) => {
    const newList = lists.filter((list) => list.id !== id);
    setLists(newList);
    setToLocalStorage(newList);
  };

  const editHandle = (id) => {
    const editTask = lists.find((list) => list.id === id);
    setIsEdit(true);
    setEditID(id);
    setInput(editTask.task);
  };

  const doneHandle = (id) => {
    const newList = lists.map((list) => {
      if (list.id === id) {
        return { ...list, done: !list.done };
      } else {
        return list;
      }
    });
    setLists(newList);
    setToLocalStorage(newList);
  };

  const setToLocalStorage = (currentState) => {
    localStorage.setItem("localStorageList", JSON.stringify(currentState));
  };

  return (
    <div>
      <section className="list">
        <div className="list-center container">
          <h1>What is your plan ?</h1>
          <form className="form-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addHandle}>
              {isEdit ? (
                <i className="icon fas fa-pen"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}
            </button>
          </form>

          <div className="list-detail">
            {lists.map((list) => {
              return (
                <List
                  key={list.id}
                  {...list}
                  deleteHandle={deleteHandle}
                  editHandle={editHandle}
                  doneHandle={doneHandle}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
