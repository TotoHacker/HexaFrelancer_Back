import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) { }

    create(createProjectDto: CreateProjectDto): Promise<Project> {
        const project = this.projectsRepository.create(createProjectDto);
        return this.projectsRepository.save(project);
    }

    findAll(): Promise<Project[]> {
        return this.projectsRepository.find();
    }

    async findOne(project_id: number): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { project_id } });
        if (!project) {
            throw new NotFoundException(`Project with ID ${project_id} not found`);
        }
        return project;
    }

    async update(project_id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        await this.projectsRepository.update(project_id, updateProjectDto);
        const updatedProject = await this.projectsRepository.findOne({ where: { project_id } });
        if (!updatedProject) {
            throw new NotFoundException(`Project with ID ${project_id} not found`);
        }
        return updatedProject;
    }

    async remove(project_id: number): Promise<void> {
        const result = await this.projectsRepository.delete(project_id);
        if (result.affected === 0) {
            throw new NotFoundException(`Project with ID ${project_id} not found`);
        }
    }
}
