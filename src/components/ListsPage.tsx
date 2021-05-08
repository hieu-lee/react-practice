import { makeStyles, TextField, Tooltip, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ToDoList from "../models/ToDoList";
import "./ListsPage.css";
import TaskList from "./TaskList";

const useStyles = makeStyles(() => ({
  newTitleTextField: {
    margin: "0 10px",
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const [MyLists, setMyLists] = useState(new Array<ToDoList>());
  const [NewName, setNewName] = useState("");
  const AddNewList = () => {
    var s = NewName.trim();
    if (s === "") {
      return;
    }
    s = s[0].toUpperCase() + s.substr(1);
    var NewList = new ToDoList();
    NewList.Name = s;
    setMyLists([...MyLists, NewList]);
    setNewName("");
  };
  const DeleteList = (list: ToDoList) => {
    setMyLists(MyLists.filter((el) => el.ListId !== list.ListId));
  };
  const NewNameChange = (e: any) => {
    setNewName(e.target.value);
  };
  const DropDown = (list: ToDoList) => {
    setMyLists(
      MyLists.map((item: ToDoList) => {
        if (item.ListId === list.ListId) {
          if (list.DeleteHeight === "0") {
            item.DeleteHeight = "30px";
          } else {
            item.DeleteHeight = "0";
          }
        }
        return item;
      })
    );
  };
  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">
        Welcome to To Do React
      </Typography>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <Tooltip title="Add">
              <img
                onClick={AddNewList}
                src="assets/add.png"
                style={{
                  height: "30px",
                  width: "30px",
                  cursor: "pointer",
                  marginLeft: "12px",
                  marginTop: "4.5px",
                }}
              />
            </Tooltip>
            <TextField
              value={NewName}
              onChange={NewNameChange}
              id="standard-basic"
              placeholder="New Title"
              className={classes.newTitleTextField}
              fullWidth={true}
            />
          </div>
        </div>
      </div>
      <hr />
      <ul>
        {MyLists.map((list) => (
          <li key={list.ListId}>
            <TaskList
              list={list}
              DropDownHandler={DropDown}
              DeleteListHandler={DeleteList}
            />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
