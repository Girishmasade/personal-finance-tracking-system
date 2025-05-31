import {Router} from 'express'
import { addTransaction, deleteAllTransactions, deleteTransaction, getDeletedTransaction, getTransaction, isDeleteTransaction, restoreAllTransaction, restoreTransaction, updateTransactions, uploadExcelTransaction } from '../controllers/transaction.controller.js'
import { protectRoute } from '../middleware/protecteRoute.middleware.js'
import { uploadXlsx } from '../middleware/multer.middleware.js'

const transactionRoute = Router()

transactionRoute.post('/add-transaction', protectRoute, addTransaction)
transactionRoute.get('/get-transaction', protectRoute, getTransaction)
transactionRoute.put('/update-transaction/:id', protectRoute, updateTransactions)
transactionRoute.delete('/delete-transaction/:id', protectRoute, deleteTransaction)
transactionRoute.post('/upload-transaction', protectRoute, uploadXlsx.single('file'), uploadExcelTransaction)
transactionRoute.get('/get-deleted-transaction', protectRoute, getDeletedTransaction)
transactionRoute.delete('/permenantly-delete-transaction/:id', protectRoute, isDeleteTransaction)
transactionRoute.patch('/restore-transaction/:id', protectRoute, restoreTransaction)
transactionRoute.put('/restore-all-transaction', protectRoute, restoreAllTransaction)
transactionRoute.delete('/delete-all-transaction',protectRoute, deleteAllTransactions)

export default transactionRoute
