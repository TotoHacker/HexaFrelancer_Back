import { IsInt, IsString, IsOptional, IsDecimal, Min } from 'class-validator';

export class CreateProjectApplicationDto {
  @IsInt()
  freelancer_id: number;

  @IsInt()
  project_id: number;

  @IsString()
  @IsOptional() // El texto de la propuesta es opcional, en caso de que no se ingrese
  proposal_text?: string;

  @IsDecimal()
  @Min(0) // El presupuesto propuesto no puede ser negativo
  proposed_budget: number;
}
