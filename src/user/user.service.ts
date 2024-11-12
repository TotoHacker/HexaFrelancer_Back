import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: UserRepository
    ){}

    async getAll(): Promise<UserEntity[]>
    {
        const list = await this.userRepository.find();
        if(!list.length){
            throw new NotFoundException({message: 'La lista esta vacia'})
        }
        return list;
    }

    async findById(userId:number): Promise<UserEntity>
    {
        const user = await this.userRepository.findOne({ where: { user_id: userId } });
        if(!user){
            throw new NotFoundException({message: 'No existe el user'});
        }
        return user;
    }

    async create(dto: UserDto): Promise<any>{
        const user = this.userRepository.create(dto);
        await this.userRepository.save(user);
        return {message: `Usuario ${user.name} creado`}
    }

    async update(userId: number, dto: UserDto): Promise<any>{
        const user = await this.userRepository.findOne({ where: { user_id: userId } });
        dto.name? user.name = dto.name : user.name = user.name;
        dto.email? user.email = dto.email : user.email = user.email;
        dto.password? user.password = dto.password : user.password = user.password;
        await this.userRepository.save(user);
        return {message: `Usuario ${user.name} actualizado`}
    }

    async delete(userId: number): Promise<any>{
        const user = await this.userRepository.findOne({ where: { user_id: userId } });
        await this.userRepository.delete(user);
        return {message: `Usuario ${user.name} eliminado`}
    }
}
