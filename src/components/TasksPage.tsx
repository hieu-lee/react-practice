import {
  Button,
  makeStyles,
  Paper,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ToDoItem from "../models/ToDoItem";
import DatePicker from "./DatePicker";
import TaskItem from "./TaskItem";
import TimePicker from "./TimePicker";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function TasksPage() {
  const [ListState, setListState] = useState(new Array<ToDoItem>());
  const [FilteredListState, setFilteredListState] = useState(ListState);
  const [DropState, setDropState] = useState("assets/down_arrow.png");
  const [ContentHeight, setContentHeight] = useState("0");
  const [NewTitle, setNewTitle] = useState("");
  const [NewContent, setNewContent] = useState("");
  const [NewImportant, setNewImportant] = useState(false);
  const [NewDate, setNewDate] = React.useState<Date | null>(null);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
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
              item.TimeRemind === null ||
              (item.TimeRemind.getDate() === today.getDate() &&
                item.TimeRemind.getMonth() === today.getMonth() &&
                item.TimeRemind.getFullYear() === today.getFullYear())
          )
        );
        return;
      case 2:
        setFilteredListState(ListState.filter((item) => !item.Completed));
        return;
      case 3:
        setFilteredListState(ListState.filter((item) => item.Important));
        return;
      case 4:
        setFilteredListState(ListState.filter((item) => item.Completed));
        return;
      default:
        return;
    }
  };
  useEffect(() => {
    updateFilter();
  }, [value, ListState]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const SaveListAsync = async () => {
    return;
  };
  const AddNewItem = async () => {
    if (NewTitle.trim() !== "") {
      setNewTitle(NewTitle.trim());
      setNewContent(NewContent.trim());
      var NewItem = new ToDoItem();
      NewItem.Important = NewImportant;
      NewItem.Title = NewTitle;
      NewItem.TimeRemind = NewDate;
      if (NewDate !== null) {
        console.log(NewDate.getDate());
        console.log(NewDate.getMonth());
        console.log(NewDate.getFullYear());
      }
      NewItem.Content = NewContent;
      setNewImportant(false);
      setNewTitle("");
      setNewDate(null);
      setNewContent("");
      setListState([...ListState, NewItem]);
    }
  };
  const ShowNewContent = () => {
    if (ContentHeight === "0") {
      setContentHeight("60px");
      setDropState("assets/up_arrow.png");
    } else {
      setContentHeight("0");
      setDropState("assets/down_arrow.png");
    }
  };
  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">
        Sample List
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={SaveListAsync} variant="contained" color="primary">
          Save List
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex" }}>
            <img
              onClick={AddNewItem}
              style={{
                width: "30px",
                height: "30px",
                marginLeft: "12px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              src="assets/add.png"
            />
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
          style={{ marginTop: "5px" }}
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
          <li key={item.ItemId}>
            <TaskItem
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
