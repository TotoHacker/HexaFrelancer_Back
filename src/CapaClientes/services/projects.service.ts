import { Injectable } from '@nestjs/common';
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
  ) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  async update(project_id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    await this.projectsRepository.update(project_id, updateProjectDto);
    return this.projectsRepository.findOne({ where: { project_id } });
  }

  async remove(project_id: number): Promise<void> {
    await this.projectsRepository.delete(project_id);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(project_id: number): Promise<Project> {
    return this.projectsRepository.findOne({ where: { project_id } });
  }
}
