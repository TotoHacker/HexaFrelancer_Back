import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Project } from './project.entity';

@Entity('ProjectApplications')
export class ProjectApplications {
  @PrimaryGeneratedColumn()
  application_id: number;

  @ManyToOne(() => Project, (project) => project.project_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => UserEntity, (user) => user.user_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'freelancer_id' })
  freelancer: UserEntity;

  @Column({ type: 'text', nullable: true })
  proposal_text: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  proposed_budget: number;

  @Column({ type: 'enum', enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' })
  status: 'Pending' | 'Accepted' | 'Rejected';
}
