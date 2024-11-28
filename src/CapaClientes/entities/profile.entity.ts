import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    JoinColumn 
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('Profiles')
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    profile_id: number;

    @ManyToOne(() => UserEntity, user => user.profiles, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ type: 'varchar', nullable: true })
    bio: string;

    @Column({ type: 'varchar', nullable: true })
    skills: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    experience: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    photo_url: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    location: string;
}
