import { Router } from "express";
import { taskService } from "../services/TaskService";
import { Category } from "../models/Category";

/**
 * Controller Layer: TaskController
 * Handles HTTP requests and maps them to Service methods.
 * Mimics Spring Boot's @RestController behavior.
 */
const router = Router();

// @GetMapping
router.get("/", (req, res) => {
  const tasks = taskService.getAllTasks().map(t => t.toJSON());
  res.json(tasks);
});

// @GetMapping("/{id}")
router.get("/:id", (req, res) => {
  const task = taskService.getTaskById(Number(req.params.id));
  if (task) {
    res.json(task.toJSON());
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// @PostMapping
router.post("/", (req, res) => {
  const { title, description, categoryName } = req.body;
  const category = new Category(Math.floor(Math.random() * 1000), categoryName || "General");
  const newTask = taskService.addTask(title, description, category);
  res.status(201).json(newTask.toJSON());
});

// @PutMapping("/{id}")
router.put("/:id", (req, res) => {
  const { title, description, completed } = req.body;
  const updatedTask = taskService.updateTask(Number(req.params.id), title, description, completed);
  if (updatedTask) {
    res.json(updatedTask.toJSON());
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// @DeleteMapping("/{id}")
router.delete("/:id", (req, res) => {
  const success = taskService.deleteTask(Number(req.params.id));
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

export const taskController = router;
