import { Controller, Post, Body, Put, Param, Delete, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Express } from 'express';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../entities/project.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Projects')
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos.', type: [Project] })
  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener detalles de un proyecto' })
  @ApiResponse({ status: 200, description: 'Detalles del proyecto.', type: Project })
  @Get(':project_id')
  findOne(@Param('project_id') project_id: number): Promise<Project> {
    return this.projectsService.findOne(project_id);
  }

  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: 201, description: 'El proyecto ha sido creado.', type: Project })
  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto as Project);
  }

  @ApiOperation({ summary: 'Subir imagen para un proyecto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload-image/:project_id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Directorio de destino
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadFile(@Param('project_id') project_id: number, @UploadedFile() file: Express.Multer.File) {
    // Aquí puedes agregar lógica para asociar la imagen al proyecto si es necesario
    return { filePath: file.path };
  }

  @ApiOperation({ summary: 'Editar un proyecto' })
  @ApiResponse({ status: 200, description: 'El proyecto ha sido actualizado.', type: Project })
  @Put('edit/:project_id')
  update(@Param('project_id') project_id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectsService.update(project_id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Eliminar un proyecto' })
  @ApiResponse({ status: 204, description: 'El proyecto ha sido eliminado.' })
  @Delete('delete/:project_id')
  remove(@Param('project_id') project_id: number): Promise<void> {
    return this.projectsService.remove(project_id);
  }

}
