import {
  LinearProgress,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { CreateNewListAsync, DeleteListAsync } from "../apis/ListsService";
import ToDoList from "../models/ToDoList";
import "./ListsPage.css";
import LogInPage from "./LogInPage";
import TaskList from "./TaskList";
import AddIcon from "../assets/add.png";

const useStyles = makeStyles(() => ({
  newTitleTextField: {
    margin: "0 10px",
  },
}));

type ListsPageProps = {
  LoadingState: boolean;
  MyLists: ToDoList[];
  setMyLists: React.Dispatch<React.SetStateAction<ToDoList[]>>;
  LoggedState: boolean;
  setLoggedState: React.Dispatch<React.SetStateAction<boolean>>;
  UsernameState: string;
  setUsernameState: React.Dispatch<React.SetStateAction<string>>;
};

export default function ListPage(props: ListsPageProps) {
  const classes = useStyles();
  const [NewName, setNewName] = useState("");
  const AddNewList = async () => {
    var s = NewName.trim();
    if (s === "") {
      return;
    }
    s = s[0].toUpperCase() + s.substr(1);
    var NewList = new ToDoList();
    NewList.name = s;
    props.setMyLists([...props.MyLists, NewList]);
    await CreateNewListAsync(props.UsernameState, NewList);
    setNewName("");
  };
  const DeleteList = async (list: ToDoList) => {
    props.setMyLists(props.MyLists.filter((el) => el.listId !== list.listId));
    await DeleteListAsync(props.UsernameState, list.listId);
  };
  const NewNameChange = (e: any) => {
    setNewName(e.target.value);
  };
  const DropDown = (list: ToDoList) => {
    props.setMyLists(
      props.MyLists.map((item: ToDoList) => {
        if (item.listId === list.listId) {
          if (list.deleteHeight === "0") {
            item.deleteHeight = "30px";
          } else {
            item.deleteHeight = "0";
          }
        }
        return item;
      })
    );
  };
  if (props.LoggedState) {
    if (props.LoadingState) {
      return (
        <div>
          <LinearProgress />
          <Typography gutterBottom align="center" variant="h5">
            Getting your lists...
          </Typography>
        </div>
      );
    } else {
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
                    src={AddIcon}
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
            {props.MyLists.map((list) => (
              <li key={list.listId}>
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
  } else {
    return (
      <LogInPage
        LoggedState={props.LoggedState}
        setLoggedState={props.setLoggedState}
        UsernameState={props.UsernameState}
        setUsernameState={props.setUsernameState}
      />
    );
  }
}
