const express = require("express");
const app = express();
const cors = require("cors");

let todoList = [{ id: 1, todo: "Study", done: false }];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Server On");
});

app.get("/api/todo", (req, res) => {
  res.json(todoList);
});

app.post("/api/todo", (req, res) => {
  const { todo, done } = req.body;
  todoList.push({
    id: Date.now(),
    todo,
    done,
  });
  return res.send("post success");
});

app.delete("/api/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todoList = todoList.filter((todo) => todo.id !== id);
});

app.listen(4000, () => console.log("server started"));
