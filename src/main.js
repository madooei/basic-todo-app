import "./style.css";

// Define app state
const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
]
let nextTodId = 4;
let filter = "all"; // can be "all", "active", or "completed"

// Grab HTML elements
const newTodoInput = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");

function renderTodos() {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = "";

  const filteredTodos = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (filter === "all") {
      filteredTodos.push(todo);
    } else if (filter === "completed" && todo.completed === true) {
      filteredTodos.push(todo);
    } else if (filter === "active" && todo.completed === false) {
      filteredTodos.push(todo);
    }
  }

  for (let i = 0; i < filteredTodos.length; i++) {
    const todo = filteredTodos[i];

    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");
    todoListElement.appendChild(todoItem);

    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.classList.add("line-through");
    }
    todoItem.appendChild(todoText);

    const todoInput = document.createElement("input");
    todoInput.classList.add("hidden", "todo-edit");
    todoInput.value = todo.text;
    todoItem.appendChild(todoInput);
  }
}

function handleNewTodoKeyDown(event) {
  const newTodoInput = event.target;
  const todoText = newTodoInput.value.trim();
  if (event.key === "Enter" && todoText !== "") {
    todos.push({
      id: nextTodId++, text: todoText, completed: false
    });
    newTodoInput.value = "";
    renderTodos();
  }
}

function renderTodoNavBar(href) {
  const elements = todoNav.children;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.href === href) {
      element.classList.add( 
        "underline",
        "underline-offset-4", 
        "decoration-rose-800", 
        "decoration-2"
      )
    } else {
      element.classList.remove(
        "underline",
        "underline-offset-4", 
        "decoration-rose-800", 
        "decoration-2"
      )
    }
  }
}

function handleClickOnNavbar(event) {
  if (event.target.tagName === "A") {
    const href = event.target.href;
    // href <- #/
    // ["#", ""]
    // ""
    const action = href.split("/").pop();
    filter = action === "" ? "all" : action;
    renderTodos();
    renderTodoNavBar(href);
  }
}

// Add event listeners
newTodoInput.addEventListener("keydown", handleNewTodoKeyDown);
todoNav.addEventListener("click", handleClickOnNavbar);

document.addEventListener("DOMContentLoaded", renderTodos);