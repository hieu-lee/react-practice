import React from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./ToDoList";

export default class ToDoItem {
  ItemId: string = uuidv4();
  ParentListId!: string;
  ParentList!: ToDoList;
  Owner!: string;
  TimeCreate!: Date;
  TimeRemind: Date | null = null;
  Important: boolean = false;
  Completed: boolean = false;
  Content: string = "";
  Title!: string;
  ContentHeight: string = "0";
  DeleteHeight: string = "0";
  LastNotified: Date | null = null;
}
