import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getAll(){
        return await this.userService.getAll();
    }

    @Get(':user_id')
    async getOne(@Param('user_id', ParseIntPipe) user_id: number){
        return await this.userService.findById(user_id)
    }

    @Post('create')
    async create(@Body() dto: UserDto){
        return await this.userService.create(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto){
        return await this.userService.login(dto);
    }

    @Put('edit/:user_id')
    async update(@Param('user_id', ParseIntPipe) user_id: number, @Body() dto: UserDto){
        return await this.userService.update(user_id, dto);
    }

    @Delete('delete/:user_id')
    async delete(@Param('user_id', ParseIntPipe) user_id: number){
        return await this.userService.delete(user_id);
    }
}
