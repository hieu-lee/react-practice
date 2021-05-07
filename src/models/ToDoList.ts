import React from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoItem from "./ToDoItem";
import Account from "./Account";

export default class ToDoList {
  ListId: string = uuidv4();
  Name!: string;
  TimeCreate: Date = new Date();
  Owner!: Account;
  Items: ToDoItem[] = [];
  DeleteHeight: string = "0";
}
