import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
    @ApiPropertyOptional({ example: 'Proyecto de ejemplo modificado' })
    readonly title?: string;

    @ApiPropertyOptional({ example: 'Descripción modificada.' })
    readonly description?: string;

    @ApiPropertyOptional({ example: 1500.00 })
    readonly budget?: number;

    @ApiPropertyOptional({ example: 'In Progress', enum: ['Open', 'In Progress', 'Completed'] })
    readonly status?: string;

    @ApiPropertyOptional({ example: '2025-01-31' })
    readonly deadline?: string;
}
