import { Router } from 'express';

import { EmployeeController } from '@controllers';
import bodyChecker from '@middlewares/bodyChecker';

const router = Router();

router.post('/login', [bodyChecker(['username', 'password']), EmployeeController.login]);

export default router;
