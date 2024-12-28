export interface IPanelItem<T> {
  listLabel: string
  listID: string | undefined
  listItems: T[]
  listSubitems: string[] | undefined
  listItemSelect: (val: T) => void
  listRemove: (val: string) => void
}
