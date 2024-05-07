import { Router } from "express";
import TodoController from "../controller/TodoController.js";

const router = Router()

router.post("/createTask",TodoController.store)
router.get("/myTasks/:userId",TodoController.showByUserId)
router.patch("/updateTask/:taskId",TodoController.updateByTodoId)

export default router