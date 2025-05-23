import {Router} from 'express';
import authRoute from './auth.route.js';
import transactionRoute from './transaction.route.js';

const routes = Router();

routes.use('/user', authRoute)
routes.use('/transaction', transactionRoute)

export default routes;