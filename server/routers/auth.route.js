import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)

export default authRoute