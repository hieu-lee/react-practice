import { Checkbox, Switch, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { DeleteItemAsync } from "../apis/ListsService";
import ToDoItem from "../models/ToDoItem";

type TaskItemProps = {
  UsernameState: string;
  Item: ToDoItem;
  ListState: ToDoItem[];
  setListState: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
};

export default function TaskItem(props: TaskItemProps) {
  const [DropState, setDropState] = useState("../../assets/down_arrow.png");
  const [ContentState, setContentState] = useState(props.Item.content);
  const [CompletedState, setCompletedState] = useState(props.Item.completed);
  const [ImportantState, setImportantState] = useState(props.Item.important);
  const ImportantChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportantState(e.target.checked);
    props.Item.important = e.target.checked;
    props.setListState(
      props.ListState.map((item) => {
        if (item.itemId === props.Item.itemId) {
          item.important = e.target.checked;
        }
        return item;
      })
    );
  };
  const ContentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentState(e.target.value);
    props.Item.content = e.target.value;
    props.setListState(
      props.ListState.map((item) => {
        if (item.itemId === props.Item.itemId) {
          item.content = e.target.value;
        }
        return item;
      })
    );
  };
  const CompletedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompletedState(e.target.checked);
    props.Item.completed = e.target.checked;
    props.setListState(
      props.ListState.map((item) => {
        if (item.itemId === props.Item.itemId) {
          item.completed = e.target.checked;
        }
        return item;
      })
    );
  };
  const ItemDropHandler = () => {
    props.setListState(
      props.ListState.map((item) => {
        if (item.itemId === props.Item.itemId) {
          if (item.deleteHeight === "0") {
            item.contentHeight = "65px";
            item.deleteHeight = "30px";
          } else {
            item.contentHeight = "0";
            item.deleteHeight = "0";
          }
        }
        return item;
      })
    );
    if (DropState === "../../assets/down_arrow.png") {
      setDropState("../../assets/up_arrow.png");
      return;
    } else {
      setDropState("../../assets/down_arrow.png");
    }
  };
  const ItemDeleteHandler = async () => {
    props.setListState(
      props.ListState.filter((item) => item.itemId !== props.Item.itemId)
    );
    await DeleteItemAsync(props.UsernameState, props.Item.itemId);
  };
  var date =
    props.Item.timeRemind === null ? null : new Date(props.Item.timeRemind);
  var time =
    date === null
      ? "Daily"
      : `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.toLocaleTimeString()}`;
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
                <span style={{ margin: "0 5px" }}>{props.Item.title}</span>
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
              height: props.Item.contentHeight,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <TextField
              style={{ marginTop: "5px", overflowY: "scroll" }}
              variant="outlined"
              multiline={true}
              fullWidth={true}
              value={ContentState}
              onChange={ContentChangeHandler}
            />
          </div>
        </div>
        <div
          onClick={ItemDeleteHandler}
          style={{
            backgroundColor: "red",
            textAlign: "center",
            height: props.Item.deleteHeight,
            transition: "height 0.5s",
            cursor: "pointer",
          }}
        >
          <img
            src="../../assets/trash.png"
            style={{
              width: "30px",
              height: props.Item.deleteHeight,
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
                <del>{props.Item.title}</del>
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
              height: props.Item.contentHeight,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <TextField
              style={{ marginTop: "5px", overflowY: "scroll" }}
              variant="outlined"
              multiline={true}
              fullWidth={true}
              value={ContentState}
              onChange={ContentChangeHandler}
            />
          </div>
        </div>
        <div
          onClick={ItemDeleteHandler}
          style={{
            backgroundColor: "red",
            textAlign: "center",
            height: props.Item.deleteHeight,
            transition: "height 0.5s",
            cursor: "pointer",
          }}
        >
          <img
            src="../../assets/trash.png"
            style={{
              width: "30px",
              height: props.Item.deleteHeight,
              transition: "height 0.5s",
            }}
          />
        </div>
        <hr />
      </div>
    );
  }
}
