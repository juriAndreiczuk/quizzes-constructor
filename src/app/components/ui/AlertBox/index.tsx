'use client'

import useAlertStore from '@/store/alert.store'
import Image from 'next/image'
import clsx from 'clsx'

const AlertBox = () => {
  const { alert } = useAlertStore()

  const styles = {
    'error': { bg: 'bg-error', icon: 'warning-triangle.svg' },
    'info': { bg: 'bg-warning', icon: 'warning-circle.svg' },
    'success': { bg: 'bg-success', icon: 'check-circle.svg' }
  }

  return alert.text && (
    <div className='fixed top-16 right-16'>
      <div className='rounded-sm min-w-[15rem] p-16 max-w-[90vw] bg-gradient-to-tr from-dark to-black relative'>
        <div className='flex justify-center'>
          <p className='px-16 text-white font-medium text-16'>{alert.text}</p>
          <Image
            className='ml-16'
            src={`/assets/${styles[alert.kind].icon}`}
            width={20}
            height={20}
            alt={alert.kind}
          />
        </div>
        <div
          className={clsx(
            'animate-allert-line origin-left absolute bottom-[-1px] left-0 h-[4px] w-full',
            styles[alert.kind].bg
          )}
        />
      </div>
    </div>
  )
}

export default AlertBox
