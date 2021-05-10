import React from "react";
import ToDoList from "./ToDoList";

export default class Account {
  username: string;
  password: string;
  lists: ToDoList[] = [];
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
