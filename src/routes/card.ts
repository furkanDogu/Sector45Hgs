import { Router } from 'express';

import { CardController } from '@controllers';
import bodyChecker from '@middlewares/bodyChecker';
import isAdmin from '@middlewares/isAdmin';

const router = Router();

router.post('/', [bodyChecker(['TCKN', 'amount']), CardController.create]);
router.get('/:TCKN', [CardController.read]); // buradan yapilacak
router.get('/', [isAdmin(), CardController.readAll]);

export default router;
