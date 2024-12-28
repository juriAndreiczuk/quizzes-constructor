export interface ICollectionItem {
  id: string
  [key: string]: unknown
}

export interface ICollectionState<T> {
  items: T[]
  currentItem: null | T,
  createItem: (item: T) => Promise<void>
  fetchItems: () => Promise<void>
  fetchItem: (id: string) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
}

export enum IUpdateOperation {
  Add,
  Remove
}
