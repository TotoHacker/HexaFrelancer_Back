import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('skills')
export class SkillEntity {
    @PrimaryGeneratedColumn()
    skill_id:    number;

    @Column({type: 'varchar', length: 255, nullable: false})
    name:       string;
}
