import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserSkillEntity } from "./user_skill.entity";

@Entity('skills')
export class SkillEntity {
    @PrimaryGeneratedColumn()
    skill_id:    number;

    @Column({type: 'varchar', length: 255, nullable: false})
    name:       string;

    @OneToMany(() => UserSkillEntity, userSkill => userSkill.skill)
    userSkills: UserSkillEntity[];
}
