import { useState, useEffect } from 'react'

const useCollection = <T>(
  collectionService: () => Promise<T[]>
) => {
  const [data, setData] = useState<T[]>([])
  const getData = async () => {
    const result: T[] = await collectionService()

    if (result.length) {
      setData(result)
    }
  }

  useEffect(() => { getData() }, [])

  return data
}

export default useCollection
