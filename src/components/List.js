import React from "react";

const List = ({ task, id, done, deleteHandle, editHandle, doneHandle }) => {
  return (
    <div className="task">
      <div className="task-col">
        <h3 className={done === true ? `task-done` : null}>{task}</h3>
        <div className="icon button-group">
          <i
            className="icon-done fas fa-check-circle"
            onClick={() => doneHandle(id)}
          ></i>
          <i className="icon-edit fas fa-pen" onClick={() => editHandle(id)}></i>
          <i className="icon-delete fas fa-trash" onClick={() => deleteHandle(id)}></i>
        </div>
      </div>
    </div>
  );
};

export default List;
