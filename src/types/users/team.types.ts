export interface ITeam {
  name: string,
  id?: string,
  members?: []
}

export interface ITeamRarting {
  team: ITeam
  points: number
}
