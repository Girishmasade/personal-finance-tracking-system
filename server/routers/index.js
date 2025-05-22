import {Router} from 'express';
import authRoute from './auth.route.js';

const routes = Router();

routes.use('/user', authRoute)

export default routes;