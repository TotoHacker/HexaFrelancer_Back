import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { UserSkillEntity } from "./user_skill.entity";

export enum UserRole {
    FREELANCER = "freelancer",
    CLIENTE = "cliente"
}

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENTE, nullable: false })
    role: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    // projects: any;

    @OneToMany(() => ProfileEntity, profile => profile.user)
    profiles: ProfileEntity[];

    @OneToMany(() => UserSkillEntity, userSkill => userSkill.user)
    userSkills: UserSkillEntity[];
}
