import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSkillDto {
    @ApiProperty({ description: 'Identificador de la habilidad' })
    @IsInt()
    @IsNotEmpty()
    skill_id: number;
}
