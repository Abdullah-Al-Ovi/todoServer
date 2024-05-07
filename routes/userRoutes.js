import { Router } from "express";
import UserController from "../controller/UserController.js";

const router = Router()

router.post("/createUser",UserController.store)
router.post("/login",UserController.login)

export default router