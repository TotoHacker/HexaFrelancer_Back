import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
    FREELANCER = "freelancer",
    CLIENTE = "cliente"
}

export class UserDto {
    @ApiProperty({ description: 'Nombre del usuario' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Correo electrónico del usuario' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: 'Rol del usuario', enum: UserRole, default: UserRole.CLIENTE, })
    @IsString()
    @IsNotEmpty()
    role: string;
}
