import { useState, useEffect } from 'react'
import useAlertStore from '@/store/alert.store'
import { AlertKind } from '@/types/alert.types'

const useCollection = <T>(
  collectionService: (errorHandler: (message: string) => void) => Promise<T[]>
) => {
  const [data, setData] = useState<T[]>([])
  const setAlert = useAlertStore(state => state.setAlert)

  const getData = async () => {
    const result: T[] = await collectionService((val: string) => {
      setAlert({ message: val, kind: AlertKind.Error, show: true })
    })

    if (result.length) {
      setData(result)
    }
  }

  useEffect(() => { getData() }, [])

  return data
}

export default useCollection
