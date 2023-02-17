import mongoose from "mongoose";

mongoose.set("strictQuery", false);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");
}

main().catch((err) => console.log(err));

const TODOSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: new Date() },
  isDone: { type: Boolean, default: false },
});

export const Todo = mongoose.model("Todo", TODOSchema);
