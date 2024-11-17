import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileDto } from '../dto/profile.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const list = await this.userRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'La lista esta vacia' });
    }
    return list;
  }

  async findById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      throw new NotFoundException({ message: 'No existe el user' });
    }
    return user;
  }

  async create(dto: UserDto): Promise<any> {
    const { password, ...rest } = dto;

    // Encriptar la contraseña
    const hashedPassword = await this.hashPassword(password);

    // Crear el nuevo usuario
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword, 
    });

    // const user = this.userRepository.create(dto);
    const savedUser = await this.userRepository.save(user);

    if (savedUser) {
      let profileDTO = new ProfileDto();
      profileDTO.user_id = savedUser.user_id;

      const userEntity = await this.userRepository.findOne({
        where: { user_id: savedUser.user_id },
      });

      if (!userEntity) {
        throw new Error('Usuario no encontrado');
      }

      const profile = this.profileRepository.create({
        ...profileDTO,
        user: userEntity,
      });

      await this.profileRepository.save(profile);
    }

    return { message: `Usuario ${user.name} creado` };
  }

  // async login(dto: LoginDto): Promise<any> {

  // }

  async login(dto: LoginDto): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { email:dto.email } });
    if (!user) {
      return null;
    }
  
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      return null;
    }
  
    return user;
  }

  async update(userId: number, dto: UserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    dto.name ? (user.name = dto.name) : (user.name = user.name);
    dto.email ? (user.email = dto.email) : (user.email = user.email);
    dto.password
      ? (user.password = dto.password)
      : (user.password = user.password);
    await this.userRepository.save(user);
    return { message: `Usuario ${user.name} actualizado` };
  }

  async delete(userId: number): Promise<any> {

    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const profile = await this.profileRepository.findOne({
      where: { user: user },
    });
    
    await this.userRepository.delete(user);
    await this.profileRepository.delete(profile);
    return { message: `Usuario ${user.name} eliminado` };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;  // Número de rondas para generar el salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
