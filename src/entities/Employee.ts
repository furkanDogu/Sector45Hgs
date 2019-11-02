import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    employeeId: number;

    @IsString()
    @IsNotEmpty()
    @Column('varchar', {
        length: 250,
        unique: true,
    })
    username: string;

    @IsString()
    @Length(8, 16)
    @Column('varchar', { length: 250 })
    password: string;
}
