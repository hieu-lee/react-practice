import React from "react";
import ToDoItem from "../models/ToDoItem";
import ToDoList from "../models/ToDoList";
import axios from "./axios";

export async function GetListsAsync(username: string) {
  var res = await axios
    .get<ToDoList[]>(`/api/Lists/lists/${username}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
  return res;
}

export async function GetTodayItemsAsync(username: string) {
  var res = await axios
    .get<ToDoItem[]>(`/api/Lists/today-items/${username}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
  return res;
}

export async function GetItemsFromDateAsync(username: string, date: string) {
  var res = await axios
    .get<ToDoItem[]>(`/api/Lists/date-items/${username}/${date}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
  return res;
}

export async function GetItemsAsync(username: string, listid: string) {
  var res = await axios
    .get<ToDoItem[]>(`/api/Lists/items/${username}/${listid}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
  return res;
}

export async function CreateNewListAsync(username: string, list: ToDoList) {
  list.ownerUsername = username;
  await axios
    .post(`api/Lists/new-list/${username}`, list)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
}

export async function UpdateListAsync(username: string, list: ToDoList) {
  await axios
    .put(`api/Lists/update-list/${username}`, list)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
}

export async function UpdateTodayItemsAsync(items: ToDoItem[]) {
  await axios
    .put("api/Lists/update-today", items)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
}

export async function DeleteListAsync(username: string, listid: string) {
  await axios
    .delete(`api/Lists/delete-list/${username}/${listid}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
}

export async function DeleteItemAsync(username: string, itemid: string) {
  await axios
    .delete(`api/Lists/delete-item/${username}/${itemid}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
}
