import { IsEnum } from 'class-validator';

export enum ProjectApplicationStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export class UpdateProjectApplicationStatusDto {
  @IsEnum(ProjectApplicationStatus)
  status: ProjectApplicationStatus;
}
