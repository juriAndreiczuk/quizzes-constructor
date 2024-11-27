export interface ITeam {
  name: string,
  teamId: string,
  id?: string,
  members?: []
}

export enum IUpdateOperation {
  Add,
  Remove
}
