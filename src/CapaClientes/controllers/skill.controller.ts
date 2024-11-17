import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SkillService } from '../services/skill.service';
import { SkillDto } from '../dto/skill.dto';

@Controller('skills')
export class SkillController {
    constructor(private readonly skillService: SkillService){}

    @Get()
    async getAll(){
        return await this.skillService.getAll();
    }

    @Get(':skill_id')
    async getOne(@Param('skill_id', ParseIntPipe) skill_id: number){
        return await this.skillService.findById(skill_id)
    }

    @Post('create')
    async create(@Body() dto: SkillDto){
        return await this.skillService.create(dto);
    }

    @Put('edit/:skill_id')
    async update(@Param('skill_id', ParseIntPipe) skill_id: number, @Body() dto: SkillDto){
        return await this.skillService.update(skill_id, dto);
    }

    @Delete('delete/:skill_id')
    async delete(@Param('skill_id', ParseIntPipe) skill_id: number){
        return await this.skillService.delete(skill_id);
    }
}
