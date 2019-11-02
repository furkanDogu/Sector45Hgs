import { Router } from 'express';

import { OperationController } from '@controllers';
import bodyChecker from '@middlewares/bodyChecker';
import isAdmin from '@middlewares/isAdmin';

const router = Router();

router.post('/', [bodyChecker(['cardId', 'amount']), OperationController.deposit]);
router.get('/:cardId', [OperationController.read]); // buradan yapilacak
router.get('/', [isAdmin(), OperationController.readAll]);

export default router;
