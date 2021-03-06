import { RequestHandler } from '@appTypes/RequestTypes';

export default (requirements: string[]): RequestHandler<any> => (req, res, next) => {
    if (!req.body || !requirements.every(requirement => !!req.body[requirement])) {
        return res.send(`Needed fields are: ${requirements.join(', ')}`);
    }

    next();
};
