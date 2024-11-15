import { Module } from '@nestjs/common';
import { ProjectApplicationsController } from '../controllers/ProjectApplications.controller';
import { ProjectApplicationsService } from '../services/ProjectApplicationsService';

@Module({
  controllers: [ProjectApplicationsController],
  providers: [ProjectApplicationsService],
})
export class ProjectApplicationsModule {}
