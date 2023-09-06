import { Router } from 'express';
import * as controllers from '../controllers/auth.js';

const router = Router();

router.route('/signin').post(controllers.signin);
router.route('/signup').post(controllers.signup);

export default router;
