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
  const [CompletedState, setCompletedState] = useState(props.Item.Completed);
  const [ImportantState, setImportantState] = useState(props.Item.Important);
  const ImportantChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportantState(e.target.checked);
    props.Item.Important = e.target.checked;
    props.setListState(
      props.ListState.map((item) => {
        if (item.ItemId === props.Item.ItemId) {
          item.Important = e.target.checked;
        }
        return item;
      })
    );
  };
  const CompletedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompletedState(e.target.checked);
    props.Item.Completed = e.target.checked;
    props.setListState(
      props.ListState.map((item) => {
        if (item.ItemId === props.Item.ItemId) {
          item.Completed = e.target.checked;
        }
        return item;
      })
    );
  };
  const ItemDropHandler = () => {
    props.setListState(
      props.ListState.map((item) => {
        if (item.ItemId === props.Item.ItemId) {
          if (item.DeleteHeight === "0") {
            item.ContentHeight = "65px";
            item.DeleteHeight = "30px";
          } else {
            item.ContentHeight = "0";
            item.DeleteHeight = "0";
          }
        }
        return item;
      })
    );
    if (DropState === "assets/down_arrow.png") {
      setDropState("assets/up_arrow.png");
      return;
    } else {
      setDropState("assets/down_arrow.png");
    }
  };
  const ItemDeleteHandler = () => {
    props.setListState(
      props.ListState.filter((item) => item.ItemId !== props.Item.ItemId)
    );
  };
  var time =
    props.Item.TimeRemind === null ? "Daily" : `${props.Item.TimeRemind}`;
  if (!CompletedState) {
    return (
      <div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div>
                <Checkbox
                  disableRipple={true}
                  color="primary"
                  checked={CompletedState}
                  onChange={CompletedChangeHandler}
                />
                <span style={{ margin: "0 5px" }}>{props.Item.Title}</span>
              </div>
              <small style={{ marginLeft: "15px" }}>Time: {time}</small>
            </div>
            <div style={{ marginRight: "12px", marginTop: "12px" }}>
              <img
                onClick={ItemDropHandler}
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
              checked={ImportantState}
              onChange={ImportantChangeHandler}
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
              style={{ marginTop: "5px" }}
              variant="outlined"
              multiline={true}
              fullWidth={true}
              value={props.Item.Content}
            />
          </div>
        </div>
        <div
          onClick={ItemDeleteHandler}
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
            style={{
              width: "30px",
              height: props.Item.DeleteHeight,
              transition: "height 0.5s",
            }}
          />
        </div>
        <hr />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#A79FEF",
            }}
          >
            <div>
              <Checkbox
                disableRipple={true}
                color="primary"
                checked={CompletedState}
                onChange={CompletedChangeHandler}
              />
              <span style={{ margin: "0 5px" }}>
                <del>{props.Item.Title}</del>
              </span>
            </div>
            <div style={{ marginRight: "12px", marginTop: "12px" }}>
              <img
                onClick={ItemDropHandler}
                src={DropState}
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              />
            </div>
          </div>
          <div
            style={{
              height: props.Item.ContentHeight,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <TextField
              style={{ marginTop: "5px" }}
              variant="outlined"
              multiline={true}
              fullWidth={true}
              value={props.Item.Content}
            />
          </div>
        </div>
        <div
          onClick={ItemDeleteHandler}
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
            style={{
              width: "30px",
              height: props.Item.DeleteHeight,
              transition: "height 0.5s",
            }}
          />
        </div>
        <hr />
      </div>
    );
  }
}
