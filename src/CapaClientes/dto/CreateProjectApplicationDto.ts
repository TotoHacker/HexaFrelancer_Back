
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectApplicationDto {
  @ApiProperty({
    description: 'ID del proyecto al que se quiere aplicar',
    example: 123,
  })
  projectId: number;

  @ApiProperty({
    description: 'ID del freelancer que aplica al proyecto',
    example: 456,
  })
  freelancerId: number;

  @ApiProperty({
    description: 'Texto de la propuesta del freelancer',
    example: 'Estoy muy interesado en este proyecto y tengo la experiencia necesaria para llevarlo a cabo.',
  })
  proposalText: string;

  @ApiProperty({
    description: 'Presupuesto propuesto por el freelancer para completar el proyecto',
    example: 1000,
  })
  proposedBudget: number;
}

export class UpdateProjectApplicationStatusDto {
  @ApiProperty({
    description: 'Nuevo estado de la solicitud (Accepted o Rejected)',
    example: 'Accepted',
  })
  status: 'Accepted' | 'Rejected';
}
