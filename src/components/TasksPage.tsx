import { Button, Switch, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ToDoItem from "../models/ToDoItem";
import DatePicker from "./DatePicker";
import TaskItem from "./TaskItem";
import TimePicker from "./TimePicker";

export default function TasksPage() {
  const [ListState, setListState] = useState(new Array<ToDoItem>());
  const [DropState, setDropState] = useState("assets/down_arrow.png");
  const [ContentHeight, setContentHeight] = useState("0");
  const [NewTitle, setNewTitle] = useState("");
  const [NewContent, setNewContent] = useState("");
  const [NewImportant, setNewImportant] = useState(false);
  const [NewDate, setNewDate] = React.useState<Date | null>(null);
  const SaveListAsync = async () => {
    return;
  };
  const AddNewItem = () => {
    if (NewTitle.trim() !== "") {
      setNewTitle(NewTitle.trim());
      setNewContent(NewContent.trim());
      var NewItem = new ToDoItem();
      NewItem.Important = NewImportant;
      NewItem.Title = NewTitle;
      NewItem.TimeRemind = NewDate;
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
      <ul>
        {ListState.map((item) => (
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
