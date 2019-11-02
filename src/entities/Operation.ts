import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Min, IsNumber } from 'class-validator';

import { Card } from './Card';

import { Lazy } from '@utils/ormHelpers';

@Entity()
export class Operation extends BaseEntity {
    @PrimaryGeneratedColumn()
    operationId: number;

    @Min(0)
    @IsNumber()
    @Column('money')
    amount: number;

    @ManyToOne(() => Card, card => card.operations, { lazy: true })
    card: Lazy<Card>;

    @CreateDateColumn()
    date: Date;
}
