import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from '../Services/user.service';
import { UserDto } from '../Dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getAll(){
        return await this.userService.getAll();
    }

    @Get(':userId')
    async getOne(@Param('userId', ParseIntPipe) userId: number){
        return await this.userService.findById(userId)
    }

    @Post()
    async create(@Body() dto: UserDto){
        return await this.userService.create(dto);
    }

    @Put(':userId')
    async update(@Param('userId', ParseIntPipe) userId: number, @Body() dto: UserDto){
        return await this.userService.update(userId, dto);
    }

    @Delete(':userId')
    async delete(@Param('userId', ParseIntPipe) userId: number){
        return await this.userService.delete(userId);
    }
}
