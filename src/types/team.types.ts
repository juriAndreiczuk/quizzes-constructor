export interface ITeam {
  name: string,
  id?: string,
  members?: []
}

export enum IUpdateOperation {
  Add,
  Remove
}
