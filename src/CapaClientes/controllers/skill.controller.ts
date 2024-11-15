import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SkillService } from '../services/skill.service';
import { SkillDto } from '../dto/skill.dto';

@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService){}

    @Get()
    async getAll(){
        return await this.skillService.getAll();
    }

    @Get(':skillId')
    async getOne(@Param('skillId', ParseIntPipe) skillId: number){
        return await this.skillService.findById(skillId)
    }

    @Post()
    async create(@Body() dto: SkillDto){
        return await this.skillService.create(dto);
    }

    @Put(':skillId')
    async update(@Param('skillId', ParseIntPipe) skillId: number, @Body() dto: SkillDto){
        return await this.skillService.update(skillId, dto);
    }

    @Delete(':skillId')
    async delete(@Param('skillId', ParseIntPipe) skillId: number){
        return await this.skillService.delete(skillId);
    }
}
