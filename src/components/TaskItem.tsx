import { Checkbox, Switch, TextField } from "@material-ui/core";
import React, { useState } from "react";
import ToDoItem from "../models/ToDoItem";

type TaskItemProps = {
  Item: ToDoItem;
  ListState: ToDoItem[];
  setListState: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
};

export default function TaskItem(props: TaskItemProps) {
  const [DropState, setDropState] = useState("assets/down_arrow.png");
  var time =
    props.Item.TimeRemind === null ? "Daily" : `${props.Item.TimeRemind}`;
  if (!props.Item.Completed) {
    return (
      <div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div>
                <Checkbox
                  disableRipple={true}
                  color="primary"
                  checked={false}
                />
                <span style={{ margin: "0 5px" }}>{props.Item.Title}</span>
              </div>
              <small style={{ marginLeft: "15px" }}>Time: {time}</small>
            </div>
            <div style={{ marginRight: "12px", marginTop: "12px" }}>
              <img
                src={DropState}
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              />
            </div>
          </div>
          <div>
            <span style={{ marginRight: "10px", marginLeft: "15px" }}>
              Important
            </span>
            <Switch
              disableRipple={true}
              checked={props.Item.Important}
              color="secondary"
              style={{ marginBottom: "0" }}
            />
          </div>
          <div
            style={{
              height: props.Item.ContentHeight,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <TextField
              variant="outlined"
              multiline={true}
              fullWidth={true}
              value={props.Item.Content}
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "red",
            textAlign: "center",
            height: props.Item.DeleteHeight,
            transition: "height 0.5s",
            cursor: "pointer",
          }}
        >
          <img
            src="assets/trash.png"
            style={{ width: "30px", height: "30px" }}
          />
        </div>
        <hr />
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ backgroundColor: "A79FEF" }}>
          <div>
            <Checkbox disableRipple={true} color="primary" checked={true} />
            <span style={{ margin: "0 5px" }}>
              <del>{props.Item.Title}</del>
            </span>
          </div>
          <div style={{ marginRight: "12px", marginTop: "12px" }}>
            <img
              src={DropState}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
          </div>
          <div
            style={{
              height: props.Item.ContentHeight,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <TextField
              variant="outlined"
              multiline={true}
              fullWidth={true}
              value={props.Item.Content}
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "red",
            textAlign: "center",
            height: props.Item.DeleteHeight,
            transition: "height 0.5s",
            cursor: "pointer",
          }}
        >
          <img
            src="assets/trash.png"
            style={{ width: "30px", height: "30px" }}
          />
        </div>
        <hr />
      </div>
    );
  }
}
