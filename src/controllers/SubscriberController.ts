import { getRepository } from 'typeorm';
import { validateOrReject } from 'class-validator';

import { Subscriber, Card, Operation } from '@entities';

import { RequestHandler } from '@appTypes/RequestTypes';
import { propertyExtractor } from '@utils/extractors';
import { findEntityById } from '@utils/ormHelpers';

export class SubscriberController {
    static register: RequestHandler<Promise<any>> = async (req, res) => {
        try {
            const { amount } = req.body;
            if (amount < 20) throw new Error('Initial balance should be minimum 20');
            const subscriberObj = Subscriber.create(propertyExtractor(req.body, ['amount']));

            await validateOrReject(subscriberObj);
            const subscriber = await subscriberObj.save();

            const card = await Card.create({
                balance: amount,
                subscriber: await findEntityById(
                    getRepository(Subscriber),
                    subscriber.subscriberId
                ),
            }).save();

            await Operation.create({
                card,
                amount,
            }).save();

            const subsWithCards = await Subscriber.findOne(subscriber.subscriberId);

            if (!subsWithCards) {
                throw new Error("Subscriber couldn't found after creation");
            }

            res.status(200).send({
                cards: await subsWithCards.cards,
            });
        } catch (error) {
            res.status(400).send({ error: error['message'] ? error['message'] : error });
        }
    };
}
