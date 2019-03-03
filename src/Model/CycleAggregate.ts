import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class CycleAggregate {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    public id?: number;
    
    @Column()
    public totalCycles: number;

    @Column('float')
    public totalCycleLength: number;

    @Column()
    @Index()
    public timestamp?: Date;
}