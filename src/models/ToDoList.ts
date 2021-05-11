import { v4 as uuidv4 } from "uuid";
import ToDoItem from "./ToDoItem";
import Account from "./Account";

export default class ToDoList {
  listId: string = uuidv4();
  name!: string;
  timeCreate: Date = new Date();
  ownerUsername!: string;
  owner!: Account;
  items: ToDoItem[] = [];
  deleteHeight: string = "0";
}
