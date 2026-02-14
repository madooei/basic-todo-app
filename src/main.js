import "./style.css";

// Define app state
let todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];
let nextTodId = 4;
let filter = "all"; // can be "all", "active", or "completed"

// Grab HTML elements
const newTodoInput = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");
const todoListElement = document.getElementById("todo-list");

const addTodo = (todoText) => [
  ...todos,
  {
    id: nextTodId++,
    text: todoText,
    completed: false
  }
]

const filterTodos = (todos, filter) => {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  } else {
    return [...todos];
  }
};

const createTodoText = (todo) => {
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  todoText.setAttribute("id", `todo-text-${todo.id}`);
  todoText.textContent = todo.text;
  if (todo.completed) {
    todoText.classList.add("line-through");
  }
  return todoText;
}

const createTodoInput = (todo) => {
  const todoInput = document.createElement("input");
  todoInput.classList.add("hidden", "todo-edit");
  todoInput.value = todo.text;
  return todoInput;
}

const createTodoItem = (todo) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("p-4", "todo-item");
  todoItem.append(
    createTodoText(todo),
    createTodoInput(todo)
  );
  return todoItem;
}

const renderTodos = () => {
  // todoListElement.innerHTML = "";
  // const filteredTodos = filterTodos(todos, filter);
  // const todoItems = filteredTodos.map(createTodoItem);
  // todoListElement.append(...todoItems);
  todoListElement.replaceChildren(
    ...filterTodos(todos, filter).map(createTodoItem)
  );
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

function handleNewTodoKeyDown(event) {
  const newTodoInput = event.target;
  const todoText = newTodoInput.value.trim();
  if (event.key === "Enter" && todoText !== "") {
    todos = addTodo(todoText);
    newTodoInput.value = "";
    renderTodos();
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

function handleClickOnTodoList(event) {
  if (event.target.id.includes("todo-text")) {
    const todoId = event.target.id.split("-").pop();
    const todoIdNumber = Number(todoId);

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todoIdNumber) {
        todos[i].completed = !todos[i].completed;
      }
    }

    renderTodos();
  }
}

// Add event listeners
newTodoInput.addEventListener("keydown", handleNewTodoKeyDown);
todoNav.addEventListener("click", handleClickOnNavbar);
todoListElement.addEventListener("click", handleClickOnTodoList);

document.addEventListener("DOMContentLoaded", renderTodos);