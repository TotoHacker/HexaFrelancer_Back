import { Module } from '@nestjs/common';
import { ProjectApplicationsController } from '../controllers/ProjectApplicationsController';
import { ProjectApplicationsService } from '../services/ProjectApplicationsService';

@Module({
  controllers: [ProjectApplicationsController],
  providers: [ProjectApplicationsService],
})
export class ProjectApplicationsModule {}
