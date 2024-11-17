import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSkillDto } from '../dto/user_skill.dto';
import { Repository } from 'typeorm';
import { UserSkillEntity } from '../entities/user_skill.entity';
import { UserEntity } from '../entities/user.entity';
import { SkillEntity } from '../entities/skill.entity';

@Injectable()
export class UserSkillService {
    constructor(
        @InjectRepository(UserSkillEntity)
        private userSkillRepository: Repository<UserSkillEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>
    ) {}

    async findById(user_id: number): Promise<UserSkillEntity[]> {
        const userSkills = await this.userSkillRepository.find({
            where: { user_id: user_id },
            relations: ['skill']
        });
        if (!userSkills.length) {
            throw new NotFoundException({ message: 'El usuario no tiene habilidades' });
        }
        return userSkills;
    }

    async update(user_id: number, dto: UserSkillDto): Promise<any> {
        const user = await this.userRepository.findOne({ where: { user_id: user_id } });
        if (!user) {
            throw new NotFoundException({ message: 'Usuario no encontrado' });
        }

        const skill = await this.skillRepository.findOne({ where: { skill_id: dto.skill_id } });
        if (!skill) {
            throw new NotFoundException({ message: 'Habilidad no encontrada' });
        }

        const existingUserSkill = await this.userSkillRepository.findOne({ where: { user_id, skill_id: dto.skill_id } });
        if (!existingUserSkill) {
            
            const newUserSkill = this.userSkillRepository.create({
                user_id,
                skill_id: dto.skill_id
            });
            await this.userSkillRepository.save(newUserSkill);
        }

        return { message: 'Habilidades actualizadas' };
    }

    async remove(user_id: number, dto: UserSkillDto): Promise<any> {
        const userSkill = await this.userSkillRepository.findOne({
            where: { user_id: user_id, skill_id: dto.skill_id }
        });

        if (!userSkill) {
            throw new NotFoundException({ message: 'La habilidad no está asociada con el usuario' });
        }

        await this.userSkillRepository.remove(userSkill);
        return { message: `Habilidad eliminada del usuario correctamente` };
    }
}
