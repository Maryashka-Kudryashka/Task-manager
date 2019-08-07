const express = require("express");
const router = express.Router();
const db = require("../db");
var ObjectId = require("mongodb").ObjectID;

router.get("/:email", async (req, res) => {
  const userEmail = req.params.email;
  const tasks = await db
    .get()
    .collection("tasks")
    .find()
    .toArray();
  const userTasks = tasks.filter(
    task =>
      task.author == userEmail ||
      (task.members && task.members.includes(userEmail))
  );
  res.send(userTasks);
});

router.post("/add", async (req, res) => {
  let task = { ...req.body };
  delete task._id;
  if (!req.body._id) {
    const postedTask = await db
      .get()
      .collection("tasks")
      .save(task);
    res.send(postedTask.ops[0]);
  } else {
    const postedTask = await db
      .get()
      .collection("tasks")
      .findOneAndUpdate(
        { _id: ObjectId(req.body._id) },
        { $set: task },
        { returnOriginal: false }
      );
    res.send(postedTask.value);
  }
});

router.delete("/delete", async (req, res) => {
  let id = req.body;
  const deletedTask = await db
    .get()
    .collection("tasks")
    .findOneAndDelete({ _id: ObjectId(id.id) });
  res.send(deletedTask.value);
});

module.exports = router;
