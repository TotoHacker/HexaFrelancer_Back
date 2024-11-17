import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserSkillService } from '../services/user_skill.service';
import { UserSkillDto } from '../dto/user_skill.dto';

@Controller('user-skills')
export class UserSkillController {
    constructor(private readonly userSkillService: UserSkillService) {}

    @Get('user/:user_id')
    async getSkillsByUser(@Param('user_id', ParseIntPipe) user_id: number) {
        return await this.userSkillService.findById(user_id);
    }

    @Put('assign/:user_id')
    async updateSkills(
        @Param('user_id', ParseIntPipe) user_id: number,
        @Body() dto: UserSkillDto
    ) {
        return await this.userSkillService.update(user_id, dto);
    }

    @Delete('remove/:user_id')
    async removeSkillFromUser(
        @Param('user_id', ParseIntPipe) user_id: number,
        @Body() dto: UserSkillDto
    ) {
        return await this.userSkillService.remove(user_id, dto);
    }
}
