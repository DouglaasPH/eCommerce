import { Router } from "express";
import loginController from "./app/controllers/login-controller.js";

const router = Router();

router.post("/createAccount", loginController.createAccount);
router.get("/login", loginController.login);
router.put("/updatePassword", loginController.newPassword);

export default router;