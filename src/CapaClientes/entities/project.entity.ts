import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Entity('Projects')
export class Project {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column()
  user_id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  budget: number;

  @Column({ type: 'enum', enum: ['Open', 'In Progress', 'Completed'], default: 'Open' })
  status: string;

  @Column('date')
  deadline: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'user_id' }) // Asegúrate de esta línea user: User;
  user: UserEntity;
}
