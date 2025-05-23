import {Router} from 'express'
import { addTransaction, getTransaction } from '../controllers/transaction.controller.js'
import { protectRoute } from '../middleware/protecteRoute.middleware.js'

const transactionRoute = Router()

transactionRoute.post('/add-transaction', protectRoute, addTransaction)
transactionRoute.get('/get-transaction', protectRoute, getTransaction)

export default transactionRoute