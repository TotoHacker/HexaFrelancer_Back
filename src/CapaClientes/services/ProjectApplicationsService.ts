import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectApplications } from '../entities/projectA.entity';
import { CreateProjectApplicationDto } from '../dto/CreateProjectApplicationDto';
import { UpdateProjectApplicationStatusDto } from '../dto/update-projectA.entity';
import { Project } from '../entities/project.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ProjectApplicationsService {
  constructor(
    @InjectRepository(ProjectApplications)
    private readonly projectApplicationsRepository: Repository<ProjectApplications>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Crea una nueva solicitud de proyecto
   */
  async create(
    createProjectApplicationDto: CreateProjectApplicationDto,
  ): Promise<ProjectApplications> {
    const { freelancer_id, project_id, proposal_text, proposed_budget } = createProjectApplicationDto;

    // Verificamos si el freelancer y el proyecto existen
    const freelancer = await this.userRepository.findOne({ where: { user_id: freelancer_id } });
    const project = await this.projectRepository.findOne({ where: { project_id: project_id } });

    if (!freelancer) {
      throw new Error('Freelancer no encontrado');
    }

    if (!project) {
      throw new Error('Proyecto no encontrado');
    }

    // Creamos la nueva solicitud de proyecto
    const newApplication = this.projectApplicationsRepository.create({
      freelancer,
      project,
      proposal_text,
      proposed_budget,
      status: 'Pending', // Estado inicial
    });

    return this.projectApplicationsRepository.save(newApplication);
  }

  /**
   * Actualiza una solicitud de proyecto existente
   */
  async update(
    application_id: number,
    updateProjectApplicationStatusDto: UpdateProjectApplicationStatusDto,
  ): Promise<ProjectApplications> {
    // Verificamos si la solicitud existe
    const application = await this.projectApplicationsRepository.findOne({ where: { application_id } });

    if (!application) {
      throw new Error('Solicitud de proyecto no encontrada');
    }

    // Actualizamos el estado de la solicitud
    await this.projectApplicationsRepository.update(application_id, updateProjectApplicationStatusDto);

    // Devolvemos la solicitud actualizada
    return this.projectApplicationsRepository.findOne({ where: { application_id } });
  }

  /**
   * Elimina una solicitud de proyecto por su ID
   */
  async remove(application_id: number): Promise<void> {
    const application = await this.projectApplicationsRepository.findOne({ where: { application_id } });

    if (!application) {
      throw new Error('Solicitud de proyecto no encontrada');
    }

    // Eliminamos la solicitud de proyecto
    await this.projectApplicationsRepository.delete(application_id);
  }

  /**
   * Obtiene todas las solicitudes de proyectos
   */
  async findAll(): Promise<ProjectApplications[]> {
    return this.projectApplicationsRepository.find({ relations: ['project', 'freelancer'] });
  }

  /**
   * Obtiene una solicitud de proyecto por su ID
   */
  async findOne(application_id: number): Promise<ProjectApplications> {
    const application = await this.projectApplicationsRepository.findOne({
      where: { application_id },
      relations: ['project', 'freelancer'], // Incluimos las relaciones
    });

    if (!application) {
      throw new Error('Solicitud de proyecto no encontrada');
    }

    return application;
  }
}
