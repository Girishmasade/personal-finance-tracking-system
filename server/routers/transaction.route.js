import {Router} from 'express'
import { addTransaction, deleteTransaction, getTransaction, updateTransactions } from '../controllers/transaction.controller.js'
import { protectRoute } from '../middleware/protecteRoute.middleware.js'

const transactionRoute = Router()

transactionRoute.post('/add-transaction', protectRoute, addTransaction)
transactionRoute.get('/get-transaction', protectRoute, getTransaction)
transactionRoute.put('/update-transaction/:id', protectRoute, updateTransactions)
transactionRoute.delete('/delete-transaction/:id', protectRoute, deleteTransaction)

export default transactionRoute