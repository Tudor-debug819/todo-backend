import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: false })
    completed: boolean;

    @Column({ type: 'timestamptz', nullable: true })
    dueDate?: Date;

    @Column({ type: 'timestamptz', nullable: true })
    completedAt?: Date | null;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}