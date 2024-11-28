import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectApplicationsController } from '../controllers/ProjectApplications.controller';
import { ProjectApplicationsService } from '../services/ProjectApplicationsService';
import { ProjectApplications } from '../entities/projectA.entity'; // Asegúrate de importar tu entidad
import { Project } from '../entities/project.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    // Importa los repositorios de las entidades que necesitas
    TypeOrmModule.forFeature([ProjectApplications, Project, UserEntity]),
  ],
  controllers: [ProjectApplicationsController],
  providers: [ProjectApplicationsService],
  exports: [ProjectApplicationsService], 
})
export class ProjectApplicationsModule {}
