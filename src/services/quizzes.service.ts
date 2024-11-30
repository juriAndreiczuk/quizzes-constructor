import { db } from '@/config/firebase'
import { IQuiz } from '@/types/quiz.types'
import { IUpdateOperation } from '@/types/team.types'
import {
  doc, setDoc, collection, query, where,
  getDocs, updateDoc, arrayUnion, arrayRemove
} from 'firebase/firestore'
import alertsData from '@/content/auth.json'
import { IAlerts } from '@/types/alert.types'

const alerts: IAlerts = alertsData as IAlerts

// create new quiz
export const createQuiz = async (data: IQuiz)
: Promise<void> => {
  try {
    const quizzesCollection = collection(db, 'quizzes')
    const quizRef = doc(quizzesCollection)
    const q = query(quizzesCollection, where('name', '==', data.label))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size > 0) {
      throw new Error(alerts.errors.quizExists)
    } else {
      await setDoc(quizRef, data)
    }
  } catch (err) {
    throw new Error(alertsData.errors.createDoc)
  }
}

// add/remove quiz question
export const updateQuizQuestions = async (
  quizId: string,
  questionId: string,
  action: IUpdateOperation,
): Promise<void> => {
  try {
    const quizRef = doc(db, 'quizzes', quizId)
    if (action === IUpdateOperation.Add) {
      await updateDoc(quizRef, {
        items: arrayUnion(questionId)
      })
    } else if (IUpdateOperation.Remove) {
      await updateDoc(quizRef, {
        items: arrayRemove(questionId)
      })
    }
  } catch (err) {
    throw new Error(alertsData.errors.updateQuiz)
  }
}
