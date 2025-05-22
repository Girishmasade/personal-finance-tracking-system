import { Router } from "express";
import { forgetPass, login, register } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protecteRoute.middleware.js";

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/forget-password', protectRoute, forgetPass)

export default authRoute