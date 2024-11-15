import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from '../entities/skill.entity';
import { Repository } from 'typeorm';
import { SkillDto } from '../dto/skill.dto';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>
    ){}

    async getAll(): Promise<SkillEntity[]>
    {
        const list = await this.skillRepository.find();
        if(!list.length){
            throw new NotFoundException({message: 'La lista esta vacia'})
        }
        return list;
    }

    async findById(skillId:number): Promise<SkillEntity>
    {
        const skill = await this.skillRepository.findOne({ where: { skill_id: skillId } });
        if(!skill){
            throw new NotFoundException({message: 'No existe la skill'});
        }
        return skill;
    }

    async create(dto: SkillDto): Promise<any>{
        const skill = this.skillRepository.create(dto);
        await this.skillRepository.save(skill);
        return {message: `Habilidad ${skill.name} creada`}
    }

    async update(skillId: number, dto: SkillDto): Promise<any>{
        const skill = await this.skillRepository.findOne({ where: { skill_id: skillId } });
        dto.name? skill.name = dto.name : skill.name = skill.name;
        await this.skillRepository.save(skill);
        return {message: `Habilidad ${skill.name} actualizada`}
    }

    async delete(skillId: number): Promise<any>{
        const skill = await this.skillRepository.findOne({ where: { skill_id: skillId } });
        await this.skillRepository.delete(skill);
        return {message: `Habilidad ${skill.name} eliminada`}
    }
}
