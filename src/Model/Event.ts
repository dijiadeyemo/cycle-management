import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from "typeorm";

@Entity()
export class Event {
    @Column()
    public symptom: number;

    @Column()
    @Index()
    public timestamp: Date;

    @Column()
    public isCycleStart?: boolean;

    @PrimaryGeneratedColumn() @PrimaryColumn() 
    public id?: number;

    @Column()
    @Index()
    public userId: number;

}