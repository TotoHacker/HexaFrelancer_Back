import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Projects')
export class Project {
    @PrimaryGeneratedColumn()
    project_id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    budget: number;

    @Column({ type: 'enum', enum: ['Open', 'In Progress', 'Completed'], default: 'Open' })
    status: string;

    @Column({ type: 'date', nullable: true })
    deadline: string;
}