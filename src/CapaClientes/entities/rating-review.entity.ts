import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Project } from '../entities/project.entity';
import { UserEntity } from '../entities/user.entity';

@Entity(`RatingsAndReviews`)
export class RatingReview {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column()
  project_id: number;

  @Column()
  reviewer_id: number;

  @Column()
  reviewee_id: number;

  @Column({ type: 'tinyint' })
  rating: number;

  @Column('text')
  comment: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: UserEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewee_id' })
  reviewee: UserEntity;
}
