import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ProfileDto } from '../dto/profile.dto';

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}

    @Get(':user_id')
    async getOne(@Param('user_id', ParseIntPipe) user_id: number){
        return await this.profileService.findById(user_id)
    }

    @Put('edit/:user_id')
    async update(@Param('user_id', ParseIntPipe) user_id: number, @Body() dto: ProfileDto){
        return await this.profileService.update(user_id, dto);
    }
}
