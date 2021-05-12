import ToDoItem from "../models/ToDoItem";
import ToDoList from "../models/ToDoList";
import axios from "./axios";

// Get all the lists of the user
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

// Get all the today tasks of the user
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

// Get at most one today task that hasn't been completed that need to be notified to the user
export async function GetOneTodayItem(username: string) {
  const date = new Date().toISOString();
  var res = await axios
    .get<ToDoItem | null>(`/api/Lists/today-one-item/${username}/${date}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
  return res;
}

// Get all the tasks on the given date of the user
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

// Get all the tasks from the given list of the user
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

// Create a new list for the user
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

// Update the given list of the user in the database
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

// Update all the given items in the database
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

// Delete the given list of the user
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

// Delete the given item of the user
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
