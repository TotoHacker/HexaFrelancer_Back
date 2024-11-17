import { IsInt, IsNotEmpty, IsString, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingReviewDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsInt()
  @IsNotEmpty()
  project_id: number;

  @ApiProperty({ example: 1, description: 'ID del usuario que califica' })
  @IsInt()
  @IsNotEmpty()
  reviewer_id: number;

  @ApiProperty({ example: 2, description: 'ID del usuario que recibe la calificación' })
  @IsInt()
  @IsNotEmpty()
  reviewee_id: number;

  @ApiProperty({ example: 5, description: 'Calificación', minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Excelente trabajo', description: 'Comentario de la reseña' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
