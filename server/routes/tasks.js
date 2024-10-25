// const express = require("express");
// const { auth } = require("../middlewares/auth");
// const {
//   getTasks,
//   createTask,
//   updateTask,
//   deleteTask,
// } = require("../controllers/taskController");

// const router = express.Router();

// router.get("/", auth, getTasks);
// router.post("/", auth, createTask);
// router.put("/:id", auth, updateTask);
// router.delete("/:id", auth, deleteTask);

// module.exports = router;
const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
