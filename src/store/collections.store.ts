import { create } from 'zustand'
import { IQuizDetails } from '@/types/question.types';
import { ITeam } from '@/types/user.types';

import { getAllDocuments, removeDocument, createDocument as createDocApi } from '@/services/docs.service'
import { ICollectionState } from '@/types/collection.types'

const createCollectionStore = <T>(
  collectionName: string,
  uniqueField: keyof T
) => create<ICollectionState<T>>(set => ({
  items: [],

  fetchItems: async () => {
    const items = await getAllDocuments<T>(collectionName)
    set({ items })
  },

  removeItem: async (itemId: string) => {
    await removeDocument(collectionName, itemId)
    set({ items: await getAllDocuments<T>(collectionName) })
  },

  createItem: async (values: T) => {
    await createDocApi<T>(collectionName, values, uniqueField as string)
    set({ items: await getAllDocuments<T>(collectionName) })
  }
}))

export const useTeamsCollectionStore = createCollectionStore<ITeam>('teams', 'name')
export const useQuizzesCollectionStore = createCollectionStore<IQuizDetails>('quizzes', 'label')