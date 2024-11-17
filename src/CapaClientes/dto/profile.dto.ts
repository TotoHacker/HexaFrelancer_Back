import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
  })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Biografia del usuario', required: false })
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Habilidades', required: false })
  @IsString()
  skills?: string;

  @ApiProperty({ description: 'Experiencia', required: false })
  @IsString()
  experience?: string;

  @ApiProperty({ description: 'Foto personal', required: false })
  @IsString()
  photo_url?: string;

  @ApiProperty({ description: 'Ubicación', required: false })
  @IsString()
  location?: string;
}
