import Todo from "./todo.js";

const todos = [
  new Todo("Buy milk"),
  new Todo("Buy jam"),
  new Todo("Buy bread"),
]

for (const todo of todos) {
  console.log(todo.id, todo.text, todo.completed)
}