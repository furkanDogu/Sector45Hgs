import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Length, IsNumber, IsString } from 'class-validator';

import { Card } from './Card';

import { Lazy } from '@utils/ormHelpers';

@Entity()
export class Subscriber extends BaseEntity {
    @PrimaryGeneratedColumn()
    subscriberId: number;

    @IsString()
    @Length(11, 11)
    @Column('varchar', { length: 11, unique: true })
    TCKN: string;

    @OneToMany(() => Card, card => card.subscriber, { lazy: true })
    cards: Lazy<Card[]>;
}
Subscriber;
