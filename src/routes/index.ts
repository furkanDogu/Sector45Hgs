import { Router, Response, Request } from 'express';

import subscriber from './subscriber';
import employee from './employee';
import card from './card';
import operation from './operation';

const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Hi there'));
router.use('/subscriber', subscriber);
router.use('/employee', employee);
router.use('/card', card);
router.use('/operation', operation);

export default router;
