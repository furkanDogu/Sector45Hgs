import _unset from 'lodash/unset';

import { Card, Subscriber } from '@entities';

import { RequestHandler } from '@appTypes/RequestTypes';

export class CardController {
    static create: RequestHandler<Promise<any>> = async (req, res) => {
        try {
            const { amount, TCKN } = req.body;
            if (req.body.amount < 20) throw new Error('Initial balance should be minimum 20');

            const subscriber = await Subscriber.findOneOrFail({ TCKN });

            const card = await Card.create({
                balance: amount,
                subscriber,
            }).save();

            _unset(card, ['__subscriber__']);

            res.status(200).send({ card });
        } catch (error) {
            res.status(400).send({ error: error['message'] ? error['message'] : error });
        }
    };

    static read: RequestHandler<Promise<any>> = async (req, res) => {
        const { TCKN } = req.params;

        try {
            const subscriber = await Subscriber.findOneOrFail({ TCKN });

            res.status(200).send({ cards: await subscriber.cards });
        } catch (error) {
            res.status(400).send({ error: error['message'] ? error['message'] : error });
        }
    };

    static readAll: RequestHandler<Promise<any>> = async (req, res) => {
        const cards = Promise.all(
            (await Card.find()).map(async card => ({ ...card, subscriber: await card.subscriber }))
        );

        res.status(200).send({
            cards: await cards,
        });
    };
}
