import { RequestHandler } from '@appTypes/RequestTypes';

import { Card, Operation } from '@entities';
import { validateOrReject } from 'class-validator';
import _unset from 'lodash/unset';

export class OperationController {
    static deposit: RequestHandler<Promise<any>> = async (req, res) => {
        try {
            const { cardId, amount } = req.body;
            const card = await Card.findOneOrFail({ cardId });

            const operationObj = Operation.create({
                card,
                amount,
            });
            await validateOrReject(operationObj);

            card.balance += amount;
            await card.subscriber;
            await card.operations;
            await card.save();

            const operation = await operationObj.save();

            _unset(operation, ['__card__']);

            res.status(200).send({ data: operation });
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: error['message'] ? error['message'] : error });
        }
    };

    static read: RequestHandler<Promise<any>> = async (req, res) => {
        try {
            const { cardId } = req.params;
            const card = await Card.findOneOrFail(cardId);

            res.status(200).send({ data: await Operation.find({ card }) });
        } catch (error) {
            res.status(400).send({ error: error['message'] ? error['message'] : error });
        }
    };
    static readAll: RequestHandler<Promise<any>> = async (req, res) => {
        try {
            const operations = Promise.all(
                (await Operation.find()).map(async opr => ({ ...opr, card: await opr.card }))
            );
            res.status(200).send({ data: await operations });
        } catch (error) {
            res.status(400).send({ error: error['message'] ? error['message'] : error });
        }
    };
}
