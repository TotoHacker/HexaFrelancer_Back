import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@ApiTags('Projects')
@Controller('api/projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post('create')
    @ApiOperation({ summary: 'Añadir un nuevo proyecto' })
    @ApiResponse({ status: 201, description: 'El proyecto ha sido creado.' })
    @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los proyectos' })
    @ApiResponse({ status: 200, description: 'Lista de proyectos.' })
    @ApiResponse({ status: 400, description: 'Lista vacia.' })
    findAll() {
        return this.projectsService.findAll();
    }

    @Get(':project_id')
    @ApiOperation({ summary: 'Obtener detalles de un proyecto' })
    @ApiParam({ name: 'project_id', description: 'ID del proyecto' })
    @ApiResponse({ status: 200, description: 'Detalles del proyecto.' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
    findOne(@Param('project_id') id: number) {
        return this.projectsService.findOne(id);
    }

    @Put('edit/:project_id')
    @ApiOperation({ summary: 'Editar un proyecto' })
    @ApiParam({ name: 'project_id', description: 'ID del proyecto' })
    @ApiResponse({ status: 200, description: 'El proyecto ha sido actualizado.' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
    update(@Param('project_id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }

    @Delete('delete/:project_id')
    @ApiOperation({ summary: 'Eliminar un proyecto' })
    @ApiParam({ name: 'project_id', description: 'ID del proyecto' })
    @ApiResponse({ status: 204, description: 'El proyecto ha sido eliminado.' })
    @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
    remove(@Param('project_id') id: number) {
        return this.projectsService.remove(id);
    }

    @Post('upload-image/:project_id')
    @ApiOperation({ summary: 'Subir imagen de muestra para un proyecto' })
    @ApiParam({ name: 'project_id', description: 'ID del proyecto' })
    @ApiResponse({ status: 200, description: 'Imagen subida exitosamente.' })
    uploadImage(@Param('project_id') id: number, @Body() file: any) {
        // Aquí puedes añadir la lógica para manejar la subida de imágenes
        return { message: 'Imagen subida exitosamente' };
    }
}
