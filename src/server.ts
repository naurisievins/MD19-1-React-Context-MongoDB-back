import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { Todo } from "./db";

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

// Get all tasks

app.get("/tasks", (req: Request, res: Response) => {
  Todo.find().then((data) => res.send(data));
});

// Add new task

app.post("/tasks", (req: Request, res: Response) => {
  const title = req.body.title;
  const content = req.body.content;
  const task = new Todo({
    title,
    content,
  });
  task.save();
  res.status(200).send("Task added");
});

// Mark task as completed

app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const isDone = req.body.isDone;

  Todo.findByIdAndUpdate(id, { isDone: !isDone }, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating task");
    }
    res.send(`Task with ID ${id} marked as Done!`);
  });
});

// Delete task

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting task!");
    }
    res.send(`Task with ID ${id} deleted successfully`);
  });
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
