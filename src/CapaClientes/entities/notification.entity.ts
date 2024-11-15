import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @Column({ type: 'int', nullable: false }) 
  user_id: number;

  @Column({ type: 'enum', enum: ['Message', 'Proposal', 'Review'], nullable: false })
  type: string;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
