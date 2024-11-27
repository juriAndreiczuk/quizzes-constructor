export interface ITeam {
  name: string,
  teamId: string,
  id?: string
}

export enum IUpdateOperation {
  Add,
  Remove
}
