import { Router } from 'express';

import { SubscriberController } from '@controllers';

import bodyChecker from '@middlewares/bodyChecker';

const router = Router();

router.post('/', [bodyChecker(['TCKN', 'amount']), SubscriberController.register]);

export default router;
