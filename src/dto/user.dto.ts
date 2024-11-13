import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    password: string;

    @ApiProperty({ description: 'Rol del usuario' enum: UserRole, default: UserRole.CLIENTE, })
    @IsString()
    @IsNotEmpty()
    role: string;
}
