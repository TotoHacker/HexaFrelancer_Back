import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ example: 1 })
    readonly user_id: number;

    @ApiProperty({ example: 'Proyecto de ejemplo' })
    readonly title: string;

    @ApiProperty({ example: 'Esta es una descripción del proyecto.' })
    readonly description: string;

    @ApiProperty({ example: 1000.00 })
    readonly budget: number;

    @ApiProperty({ example: 'Open', enum: ['Open', 'In Progress', 'Completed'] })
    readonly status: string;

    @ApiProperty({ example: '2024-12-31' })
    readonly deadline: string;
}
