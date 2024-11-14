import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from '../services/projects.service';
import { ProjectsController } from '../controllers/projects.controller';
import { Project } from '../entities/project.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project, UserEntity])],
    providers: [ProjectsService],
    controllers: [ProjectsController],
})
export class ProjectsModule { }
