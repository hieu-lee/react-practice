import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ToDoList from "../models/ToDoList";
import DownArrow from "../assets/down_arrow.png";
import UpArrow from "../assets/up_arrow.png";
import TrashIcon from "../assets/trash.png";
import ListIcon from "../assets/list.png";

type taskListProps = {
  list: ToDoList;
  DropDownHandler: (list: ToDoList) => void;
  DeleteListHandler: (list: ToDoList) => void;
};

export default function TaskList(props: taskListProps) {
  const [DropState, setDropState] = useState(DownArrow);
  var date = new Date(props.list.timeCreate);
  var time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <div>
            <NavLink
              to={`/react-practice/task/${props.list.listId}/${props.list.name}`}
            >
              <img
                className="list-pic"
                style={{ cursor: "pointer" }}
                src={ListIcon}
              />
            </NavLink>
          </div>
          <div>
            <Typography variant="h4" gutterBottom>
              {props.list.name}
            </Typography>
            <small>
              Last update: {time} at {date.toLocaleTimeString()}
            </small>
          </div>
        </div>
        <div>
          <img
            src={DropState}
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={() => {
              props.DropDownHandler(props.list);
              if (DropState === DownArrow) {
                setDropState(UpArrow);
                return;
              } else {
                setDropState(DownArrow);
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
          height: props.list.deleteHeight,
          transition: "height 0.5s",
          cursor: "pointer",
        }}
      >
        <img
          src={TrashIcon}
          style={{
            width: "30px",
            height: props.list.deleteHeight,
            transition: "height 0.5s",
          }}
        />
      </div>
    </div>
  );
}
