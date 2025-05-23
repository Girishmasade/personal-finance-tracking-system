import {Router} from 'express'
import { addTransaction } from '../controllers/transaction.controller.js'
import { protectRoute } from '../middleware/protecteRoute.middleware.js'

const transactionRoute = Router()

transactionRoute.post('/add-transaction', protectRoute, addTransaction)

export default transactionRoute