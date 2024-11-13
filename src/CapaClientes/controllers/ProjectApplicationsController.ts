// src/capaAplicacion/controllers/ProjectApplicationsController.ts
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateProjectApplicationDto, UpdateProjectApplicationStatusDto } from '../dto/CreateProjectApplicationDto';
import { ProjectApplicationsService } from '../services/ProjectApplicationsService';

@ApiTags('Project Applications')
@Controller('project-applications')
export class ProjectApplicationsController {
  constructor(private readonly projectApplicationsService: ProjectApplicationsService) {}

  @Post('apply')
  applyForProject(@Body() createDto: CreateProjectApplicationDto) {
    return this.projectApplicationsService.applyForProject(createDto);
  }

  @Put('update-status/:applicationId')
  @ApiParam({ name: 'applicationId', description: 'ID de la solicitud a actualizar', example: 789 })
  updateApplicationStatus(
    @Param('applicationId') applicationId: number,
    @Body() updateDto: UpdateProjectApplicationStatusDto,
  ) {
    return this.projectApplicationsService.updateApplicationStatus(applicationId, updateDto);
  }

  @Get(':projectId')
  @ApiParam({ name: 'projectId', description: 'ID del proyecto para obtener las solicitudes', example: 123 })
  getApplicationsForProject(@Param('projectId') projectId: number) {
    return this.projectApplicationsService.getApplicationsForProject(projectId);
  }

  @Get('freelancer/:freelancerId')
  @ApiParam({ name: 'freelancerId', description: 'ID del freelancer para obtener las solicitudes', example: 456 })
  getApplicationsForFreelancer(@Param('freelancerId') freelancerId: number) {
    return this.projectApplicationsService.getApplicationsForFreelancer(freelancerId);
  }
}
