import { Router } from "express";
import { forgetPass, getUserProfile, login, register, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protecteRoute.middleware.js";

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/forget-password', forgetPass)
authRoute.get('/get-user-profile/:id', getUserProfile)
authRoute.put('/update-profile/:id', protectRoute, updateProfile)


export default authRoute