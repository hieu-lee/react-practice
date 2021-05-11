import {
  Button,
  LinearProgress,
  makeStyles,
  Paper,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GetItemsAsync, UpdateListAsync } from "../apis/ListsService";
import ToDoItem from "../models/ToDoItem";
import ToDoList from "../models/ToDoList";
import DatePicker from "./DatePicker";
import LogInPage from "./LogInPage";
import TaskItem from "./TaskItem";
import TimePicker from "./TimePicker";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

type TasksPageProps = {
  listName: string;
  listId: string;
  LoggedState: boolean;
  setLoggedState: React.Dispatch<React.SetStateAction<boolean>>;
  UsernameState: string;
  setUsernameState: React.Dispatch<React.SetStateAction<string>>;
};

export default function TasksPage(props: TasksPageProps) {
  const [LoadingState, setLoadingState] = useState(true);
  const [ListState, setListState] = useState(new Array<ToDoItem>());
  useEffect(() => {
    const getMyList = async () => {
      if (props.LoggedState) {
        var myItems = await GetItemsAsync(props.UsernameState, props.listId);
        setLoadingState(false);
        setListState(myItems);
        return myItems;
      }
    };
    getMyList();
  }, [props.UsernameState, props.listId]);
  var thisList = new ToDoList();
  thisList.listId = props.listId;
  const [FilteredListState, setFilteredListState] = useState(ListState);
  const [DropState, setDropState] = useState("../../assets/down_arrow.png");
  const [ContentHeight, setContentHeight] = useState("0");
  const [NewTitle, setNewTitle] = useState("");
  const [NewContent, setNewContent] = useState("");
  const [NewImportant, setNewImportant] = useState(false);
  const [NewDate, setNewDate] = React.useState<Date | null>(null);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const updateFilter = () => {
      switch (value) {
        case 0:
          setFilteredListState(ListState);
          return;
        case 1:
          const today = new Date();
          setFilteredListState(
            ListState.filter(
              (item) =>
                item.timeRemind === null ||
                (new Date(item.timeRemind).getDate() === today.getDate() &&
                  new Date(item.timeRemind).getMonth() === today.getMonth() &&
                  new Date(item.timeRemind).getFullYear() ===
                    today.getFullYear())
            )
          );
          return;
        case 2:
          setFilteredListState(ListState.filter((item) => !item.completed));
          return;
        case 3:
          setFilteredListState(ListState.filter((item) => item.important));
          return;
        case 4:
          setFilteredListState(ListState.filter((item) => item.completed));
          return;
        default:
          return;
      }
    };
    updateFilter();
  }, [value, ListState]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const SaveListAsync = async () => {
    thisList.items = ListState;
    await UpdateListAsync(props.UsernameState, thisList);
    return;
  };
  const AddNewItem = async () => {
    if (NewTitle.trim() !== "") {
      setNewTitle(NewTitle.trim());
      setNewContent(NewContent.trim());
      var NewItem = new ToDoItem();
      NewItem.important = NewImportant;
      NewItem.title = NewTitle;
      NewItem.timeRemind = NewDate;
      NewItem.content = NewContent;
      NewItem.owner = props.UsernameState;
      NewItem.parentList = thisList;
      NewItem.parentListId = props.listId;
      setNewImportant(false);
      setNewTitle("");
      setNewDate(null);
      setNewContent("");
      setListState([...ListState, NewItem]);
    }
  };
  const ShowNewContent = () => {
    if (ContentHeight === "0") {
      setContentHeight("65px");
      setDropState("../../assets/up_arrow.png");
    } else {
      setContentHeight("0");
      setDropState("../../assets/down_arrow.png");
    }
  };
  if (props.LoggedState) {
    if (LoadingState) {
      return (
        <div>
          <LinearProgress />
          <Typography gutterBottom align="center" variant="h5">
            Getting your tasks...
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="h3" gutterBottom align="center">
            {props.listName}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={SaveListAsync} variant="contained" color="primary">
              Save List
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex" }}>
                <Tooltip title="Add">
                  <img
                    onClick={AddNewItem}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginLeft: "12px",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    src="../../assets/add.png"
                  />
                </Tooltip>
                <TextField
                  fullWidth={true}
                  placeholder="Title"
                  value={NewTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                  style={{ margin: "0 10px" }}
                />
              </div>
              <div style={{ display: "flex", marginLeft: "15px" }}>
                <div>
                  <DatePicker
                    label="Work Date"
                    NewDate={NewDate}
                    setNewDate={setNewDate}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <TimePicker
                    label="Work Time"
                    NewDate={NewDate}
                    setNewDate={setNewDate}
                  />
                </div>
              </div>
            </div>
            <div style={{ marginRight: "12px", marginTop: "12px" }}>
              <img
                onClick={ShowNewContent}
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
              checked={NewImportant}
              onChange={(e) => {
                setNewImportant(e.target.checked);
              }}
              color="secondary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div
            style={{
              height: ContentHeight,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <TextField
              style={{ marginTop: "5px", overflowY: "scroll" }}
              placeholder="Content"
              variant="outlined"
              value={NewContent}
              multiline={true}
              fullWidth={true}
              onChange={(e) => {
                setNewContent(e.target.value);
              }}
            />
          </div>
          <hr />
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="All Tasks" />
              <Tab label="Today Tasks" />
              <Tab label="Uncompleted Tasks" />
              <Tab label="Important Tasks" />
              <Tab label="Completed Tasks" />
            </Tabs>
          </Paper>
          <ul>
            {FilteredListState.map((item) => (
              <li key={item.itemId}>
                <TaskItem
                  UsernameState={props.UsernameState}
                  Item={item}
                  ListState={ListState}
                  setListState={setListState}
                />
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
