/* Todo-list in JavaScript
 * Author: Andreas Carlsson
 * Date: 2022-09-30
 */

const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const ul = document.querySelector("ul");
const todoArray = [];
const mess = document.querySelector("small");
const showCompleted = document.querySelector("p");

let completedCount = 0;
let text;
let message;

/* This function adds the user input as new todo-tasks.
 * It control for one whitespace input by return an error
 * message. It adds list and span elements and one trashcan
 * button for deletion of tasks.
 */
function addTodo() {
  text = input.value; // För över inputvärdet till variabeln text
  const item = document.createElement("li"); // Skapa ett list element "item"
  const itemLabel = document.createElement("span"); // skapa nytt element "span"
  const todoObject = {
    id: todoArray.length,
    todo: text,
    status: "uncompleted"
  }; // Create new todo object
  let trashCan = document.createElement("button");

  // Validation of input:
  if (text.length == 0) {
    mess.innerHTML = "Du måste skriva något";
    mess.setAttribute("class", "blinkers" )
    return;
  }
  mess.innerHTML = "";
  mess.setAttribute("class", "")

  // Adding object to array
  
  todoArray.push(todoObject);

  // Adding list and span element with a new todo and a trashcan button
  itemLabel.innerText = text;
  trashCan.innerHTML = "&#x1F5D1;";
  trashCan.setAttribute("class", "trashCan");
  ul.appendChild(item);
  item.appendChild(itemLabel);
  item.appendChild(trashCan);
  itemLabel.setAttribute("id", "span");

  /* When "clicking" on a task, mark it as completed by
    adding the class "completed" if it's not already completed. 
    Decrement the counts.
    */
  itemLabel.addEventListener("click", function () {
    if (item.getAttribute("class") == "completed") {
      item.setAttribute("class", "");
      completedCount--;
    } else {
      item.setAttribute("class", "completed");
      completedCount++;
    }

    // Correct grammatic of task..
    if (completedCount > 1) {
      showCompleted.innerText = completedCount + " Completed tasks";
    } else {
      showCompleted.innerText = `${completedCount} completed task`;
    }
  });

  /* A function to delete the element from the todoarray.
   * Using the findIndex method to locate the index. Use splice to
   * 
  */
  function deleteTodo(e){
    const selectedIndex = todoArray.findIndex((item)=> item.id == e);

    todoArray.splice(selectedIndex, 1);
    }

  /* When click on the trashcan: Control if the task is done,
   * if so then decrement completed task by one. Remove the task
   * and show the new count. Also call the deleteTodo function to
   * remove the object from the todoArray.
   */
  trashCan.addEventListener("click", function () {
    if (item.getAttribute("class") == "completed") {
      completedCount--;
      item.remove();
      deleteTodo(item);
    } else {
      item.remove();
      deleteTodo(item);
    }
    showCompleted.innerText = completedCount + " Completed tasks";
  });
  input.value = "";
}

// When clicking the add-button: Add the task to the Todo-list
addBtn.addEventListener("click", function () {
  addTodo();
});
