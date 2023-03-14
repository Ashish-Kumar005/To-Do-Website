let itemsArrayStr;
let itemsArray;
let tableBody;
let str;
let description;
let title;

function addAnItem() {
  title = document.getElementById("title").value;
  description = document.getElementById("description").value;
  if (localStorage.getItem("itemsJson") == null) {
    itemsArray = [];
    itemsArray.push([title, description]);
    localStorage.setItem("itemsJson", JSON.stringify(itemsArray));
  } else {
    itemsArrayStr = localStorage.getItem("itemsJson");
    itemsArray = JSON.parse(itemsArrayStr);
    itemsArray.push([title, description]);
    localStorage.setItem("itemsJson", JSON.stringify(itemsArray));
  }
  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemsArray = [];
  } else {
    itemsArrayStr = localStorage.getItem("itemsJson");
    itemsArray = JSON.parse(itemsArrayStr);
  }
  // Display the rows or Populate the table
  tableBody = document.getElementById("tableBody");
  str = "";
  itemsArray.forEach((element, index) => {
    str += `
                <tr id="done-${index + 1}">
                <td scope="row">
                <input type="checkbox" id= "checked-${
                  index + 1
                }" class= "arrow" onclick = "taskComplete(${index})"></td>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-sm btn-primary" onclick = "deletedAnItem(${index})">Delete</button></td>
                </tr> `;
  });
  tableBody.innerHTML = str;
}

function deletedAnItem(indexItems) {
  itemsArrayStr = localStorage.getItem("itemsJson");
  itemsArray = JSON.parse(itemsArrayStr);
  itemsArray.splice(indexItems, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemsArray));
  update();
}

function clearAllItems() {
  if (confirm("Do you want to clear all items")) {
    // console.log("Clear Hua");
    localStorage.clear();
    update();
  }
}

function taskComplete(taskIndex) {
  // console.log("Task Complete");
  let done;
  if (document.getElementById("checked-" + (taskIndex + 1)).checked) {
    done = document.getElementById("done-" + (taskIndex + 1));
    done.style.opacity = ".3";
  } else {
    done = document.getElementById("done-" + (taskIndex + 1));
    done.style.opacity = "1";
  }
}

function cursorBox() {
  let checkBox = document.getElementsByClassName("arrow");
  for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].style.cursor = "pointer";
  }
}
update();
cursorBox();
