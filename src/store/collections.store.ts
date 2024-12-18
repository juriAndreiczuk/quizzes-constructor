import { create } from 'zustand'
import { IQuizDetails } from '@/types/question.types'
import { ITeam } from '@/types/user.types'
import { removeDocument, getDocument } from '@/services/docs.service'
import { getCollection, addToCollection } from '@/services/collections.service'
import { ICollectionState } from '@/types/collection.types'

const createCollectionStore = <T extends { [key: string]: any }>(
  collectionName: string,
  uniqueField: keyof T
) => create<ICollectionState<T>>(set => ({
  items: [],
  currentItem: null,

  fetchItems: async () => {
    const items = await getCollection<T>(collectionName)
    set({ items })
  },

  fetchItem: async (itemId: string) => {
    const currentItem = await getDocument<T>(itemId, collectionName)
    set({ currentItem })
  },

  removeItem: async (itemId: string) => {
    await removeDocument(collectionName, itemId)
    set({ items: await getCollection<T>(collectionName) })
  },

  createItem: async (values: T) => {
    await addToCollection<T>(collectionName, values, uniqueField as string)
    set({ items: await getCollection<T>(collectionName) })
  }
}))

export const useTeamsCollectionStore = createCollectionStore<ITeam>('teams', 'name')
export const useQuizzesCollectionStore = createCollectionStore<IQuizDetails>('quizzes', 'label')
