import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SkillDto {
    @ApiProperty({ description: 'Nombre de la habilidad' })
    @IsString()
    @IsNotEmpty()
    name:       string;
}
