export interface ICollectionState<T> {
  items: T[]
  createItem: (item: T) => Promise<void>
  fetchItems: () => Promise<void>
  removeItem: (itemId: string) => Promise<void>
}

export enum IUpdateOperation {
  Add,
  Remove
}
