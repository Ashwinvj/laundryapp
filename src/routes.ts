import { Router } from 'express';
import usersRouter from './controllers/usersController';
import utilsRouter from './controllers/utilsController';
import * as welcomeController from './controllers/welcomeController';
import signupRouter from './controllers/signupController';
import { AuthHandler } from './middlewares/authHandler';
import loginRouter from './controllers/loginController';
import productDetailsRouter from './controllers/productDetailsController';
import serviceProviderRouter from './controllers/serviceProviderController';

const auth = new AuthHandler();
const router: Router = Router();

router.get('/', welcomeController.index);
router.use('/utils', utilsRouter);
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/users', auth.authenticate(), usersRouter);
router.use('/productDetails', productDetailsRouter);
router.use('/serviceProvider', serviceProviderRouter);

export default router;
