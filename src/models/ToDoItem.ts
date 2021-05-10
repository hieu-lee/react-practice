import React from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./ToDoList";

export default class ToDoItem {
  itemId: string = uuidv4();
  parentListId!: string;
  parentList!: ToDoList;
  owner!: string;
  timeCreate!: Date;
  timeRemind: Date | null = null;
  important: boolean = false;
  completed: boolean = false;
  content: string = "";
  title!: string;
  contentHeight: string = "0";
  deleteHeight: string = "0";
  lastNotified: Date | null = null;
}
