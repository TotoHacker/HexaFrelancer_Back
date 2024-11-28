import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ProjectApplicationsService } from '../services/ProjectApplicationsService';
import { CreateProjectApplicationDto } from '../dto/CreateProjectApplicationDto';
import { UpdateProjectApplicationStatusDto } from '../dto/update-projectA.entity';

@Controller('project-applications')
export class ProjectApplicationsController {
  constructor(
    private readonly projectApplicationsService: ProjectApplicationsService,
  ) {}

  @Post()
  create(@Body() createProjectApplicationDto: CreateProjectApplicationDto) {
    return this.projectApplicationsService.create(createProjectApplicationDto);
  }

  @Get()
  findAll() {
    return this.projectApplicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectApplicationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProjectApplicationStatusDto: UpdateProjectApplicationStatusDto,
  ) {
    return this.projectApplicationsService.update(id, updateProjectApplicationStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectApplicationsService.remove(id);
  }
}
