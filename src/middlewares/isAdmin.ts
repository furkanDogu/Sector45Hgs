import jwt from 'jsonwebtoken';

import { RequestHandler } from '@appTypes/RequestTypes';
import { checkAccessToken } from '@utils/authHelpers';

export default (): RequestHandler<any> => (req, res, next) => {
    try {
        const token = req.headers['auth_token'];
        if (!token) {
            throw new Error();
        }
        checkAccessToken(token as string);
        next();
    } catch (error) {
        res.status(403).send({ error: 'Authentication Error' });
    }
};
