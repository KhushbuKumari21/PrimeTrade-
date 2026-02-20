const router = require("express").Router();

const Task = require("../models/Task");

const auth = require("../middleware/auth");

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create new task
 *     security:
 *       - bearerAuth: []
 */
router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({
        msg: "Title required",
      });
    }

    const task = await Task.create({
      title: req.body.title,

      description: req.body.description,

      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch {
    res.status(500).json({
      msg: "Task creation failed",
    });
  }
});

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks of logged in user
 */
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
    });

    res.json(tasks);
  } catch {
    res.status(500).json({
      msg: "Failed to fetch tasks",
    });
  }
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update task
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({
        msg: "Task not found",
      });

    if (task.userId.toString() !== req.user.id)
      return res.status(403).json({
        msg: "Unauthorized",
      });

    await task.updateOne(req.body);

    res.json({
      msg: "Task updated",
    });
  } catch {
    res.status(500).json({
      msg: "Update failed",
    });
  }
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete task
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({
        msg: "Task not found",
      });

    if (task.userId.toString() !== req.user.id)
      return res.status(403).json({
        msg: "Unauthorized",
      });

    await task.deleteOne();

    res.json({
      msg: "Task deleted",
    });
  } catch {
    res.status(500).json({
      msg: "Delete failed",
    });
  }
});

module.exports = router;
