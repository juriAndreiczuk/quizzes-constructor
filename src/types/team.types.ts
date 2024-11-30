export interface ITeam {
  name: string,
  id?: string,
  members?: []
}

export enum IUpdateOperation {
  Add,
  Remove
}

export interface ITeamState {
  teams: ITeam[]
  createTeam: (team: ITeam) => Promise<void>
  fetchTeams: () => Promise<void>
  removeTeam: (teamId: string) => Promise<void>
}
