import { Router } from "express";
import { forgetPass, login, register, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protecteRoute.middleware.js";
import { uploadExcelTransaction } from "../controllers/transaction.controller.js";
import { uploadXlsx } from "../middleware/multer.middleware.js";

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/forget-password', protectRoute, forgetPass)
authRoute.put('/update-profile/:id', protectRoute, updateProfile)
authRoute.post('/upload-transaction', protectRoute, uploadXlsx.single('file'), uploadExcelTransaction)

export default authRoute