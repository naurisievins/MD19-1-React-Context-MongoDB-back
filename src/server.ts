import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");
}

main().catch((err) => console.log(err));

const TODOSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  isDone: { type: Boolean, required: true },
});

const Todo = mongoose.model("Todo", TODOSchema);

const task = new Todo({
  title: "Task1",
  content: "Do homework",
  date: new Date(),
  isDone: false,
});

task.save();

const res = Todo.find();

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.get("/tasks", (req: Request, res: Response) => {
  Todo.find().then((data) => res.send(data));
});

app.get("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  // const id = "63ef557bc9de64720dc262ce";
  Todo.findById(id).then((data) => {
    data.title = "new title";
    res.send(data);
  });
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
