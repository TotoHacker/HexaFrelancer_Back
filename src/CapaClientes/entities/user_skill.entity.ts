import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { SkillEntity } from './skill.entity';

@Entity('userskills')
export class UserSkillEntity {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    skill_id: number;

    @ManyToOne(() => UserEntity, user => user.userSkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => SkillEntity, skill => skill.userSkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'skill_id' })
    skill: SkillEntity;
}
