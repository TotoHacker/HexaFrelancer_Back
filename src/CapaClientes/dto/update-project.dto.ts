import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum, IsDecimal, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ example: 'Nombre del proyecto', description: 'Título del proyecto', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Descripción del proyecto', description: 'Descripción del proyecto', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1000.00, description: 'Presupuesto del proyecto', required: false })
  @IsDecimal()
  @IsOptional()
  budget?: number;

  @ApiProperty({ example: 'Open', enum: ['Open', 'In Progress', 'Completed'], description: 'Estado del proyecto', required: false })
  @IsEnum(['Open', 'In Progress', 'Completed'])
  @IsOptional()
  status?: string;

  @ApiProperty({ example: '2024-12-31', description: 'Fecha límite del proyecto', required: false })
  @IsDateString()
  @IsOptional()
  deadline?: string;
}
