const express = require("express");
const router = express.Router();
const db = require("../db");
var ObjectId = require("mongodb").ObjectID;

router.get("/alltasks", async (req, res) => {
  const tasks = await db
    .get()
    .collection("tasks")
    .find()
    .toArray();
  res.send(tasks);
});

router.post("/add", async (req, res) => {
  let task = { ...req.body };
  delete task._id;
  if (!req.body._id) {
    console.log(task,"add")
    const postedTask = await db
      .get()
      .collection("tasks")
      .save(task);
    res.send(postedTask.ops[0]);
  } else {
    console.log(task, "update")
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
  console.log("server", id);
  const deletedTask = await db
    .get()
    .collection("tasks")
    .findOneAndDelete({ _id: ObjectId(id.id) });
  res.send(deletedTask.value);
});

// router.get('/:id', async (req, res) => {
//     const recipeId = req.params.id;
//     const recipe = await db.get().collection('recipes').findOne(ObjectId(recipeId));
//     res.send(recipe);
// });

// router.post("/add", async (req, res) => {
//   let recipe = { ...req.body };
//   delete recipe._id;
//   if (!req.body._id) {
//     const date = new Date();
//     recipe.date = date;
//     const savedRecipe = await db
//       .get()
//       .collection("recipes")
//       .save(recipe);
//     res.send(savedRecipe.ops[0]);
//   } else {
//     const savedRecipe = await db
//       .get()
//       .collection("recipes")
//       .findOneAndUpdate(
//         { _id: ObjectId(req.body._id) },
//         { $set: recipe },
//         { returnOriginal: false }
//       );
//     res.send(savedRecipe.value);
//   }
// });

module.exports = router;
