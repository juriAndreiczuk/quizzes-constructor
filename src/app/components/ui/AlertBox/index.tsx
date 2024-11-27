'use client'

import useAlertStore from '@/store/alert.store'

const AlertBox = () => {
  const alert = useAlertStore(state => state.alert)

  return alert.show && alert.message && (
    <div>
      <p>{alert.message}</p>
    </div>
  )
}

export default AlertBox
