export class CreateProjectApplicationDto {
    projectId: number;
    freelancerId: number;
    proposalText: string;
    proposedBudget: number;
  }
  
  export class UpdateStatusDto {
    status: 'Pending' | 'Accepted' | 'Rejected';
  }
  