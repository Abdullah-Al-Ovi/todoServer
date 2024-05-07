import { Router } from "express";

import UserRoutes from "./userRoutes.js"
import TodoRoutes from "./todoRoutes.js"

const router = Router()

router.use("/api/v1/users",UserRoutes)
router.use("/api/v1/todos",TodoRoutes)

export default router