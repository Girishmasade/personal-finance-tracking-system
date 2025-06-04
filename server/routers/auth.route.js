import { Router } from "express";
import { forgetPass, login, register, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protecteRoute.middleware.js";

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/forget-password', forgetPass)
authRoute.put('/update-profile/:id', protectRoute, updateProfile)


export default authRoute