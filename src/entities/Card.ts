import { PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, Entity } from 'typeorm';
import { Min, IsNumber } from 'class-validator';

import { Operation } from './Operation';
import { Subscriber } from './Subscriber';

import { Lazy } from '@utils/ormHelpers';

@Entity()
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn()
    cardId: number;

    @Min(0)
    @IsNumber()
    @Column('money')
    balance: number;

    @ManyToOne(() => Subscriber, subscriber => subscriber.cards, { lazy: true })
    subscriber: Lazy<Subscriber>;

    @OneToMany(() => Operation, operation => operation.card, { lazy: true })
    operations: Lazy<Operation[]>;
}
