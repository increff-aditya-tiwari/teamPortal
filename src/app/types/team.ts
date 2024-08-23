export type Team = {
    teamId: number;
    teamName: string;
    createdBy: number;
    description: string;
    members?: number[];  // Optional array of user IDs
  };