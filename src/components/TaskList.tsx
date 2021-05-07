import React, { useState } from "react";
import ToDoList from "../models/ToDoList";

type taskListProps = {
  list: ToDoList;
  DropDownHandler: (list: ToDoList) => void;
  DeleteListHandler: (list: ToDoList) => void;
};

export default function TaskList(props: taskListProps) {
  const [DropState, setDropState] = useState("assets/down_arrow.png");
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <div>
            <img
              className="list-pic"
              style={{ cursor: "pointer" }}
              src="assets/list.png"
            />
          </div>
          <div>
            <h4>{props.list.Name}</h4>
            <small>
              Last update: {props.list.TimeCreate.toLocaleTimeString()}
            </small>
          </div>
        </div>
        <div>
          <img
            src={DropState}
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={() => {
              props.DropDownHandler(props.list);
              if (DropState === "assets/down_arrow.png") {
                setDropState("assets/up_arrow.png");
                return;
              } else {
                setDropState("assets/down_arrow.png");
              }
            }}
          />
        </div>
      </div>
      <div
        onClick={() => {
          props.DeleteListHandler(props.list);
        }}
        style={{
          backgroundColor: "red",
          textAlign: "center",
          height: props.list.DeleteHeight,
          transition: "height 0.5s",
          cursor: "pointer",
        }}
      >
        <img
          src="assets/trash.png"
          style={{
            width: "30px",
            height: props.list.DeleteHeight,
            transition: "height 0.5s",
          }}
        />
      </div>
    </div>
  );
}
