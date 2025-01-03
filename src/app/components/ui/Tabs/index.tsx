'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { ITabs } from '@/types'

const Tabs = ({ children, tabsLabels }: ITabs) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div>
      <div className='flex flex-wrap'>
        { tabsLabels.length && tabsLabels.map((label, index) => (
          <div
            key={label}
            className='mb-16 mr-16'
          >
            <button
              className={clsx(
                'border-addl border-[1px] text-white py-8 px-16 rounded-sm',
                index === activeIndex ? 'bg-main' : 'bg-dark'
              )}
              onClick={() => { setActiveIndex(index) }}
            >
              { label }
            </button>
          </div>
        )) }
      </div>
      <div>
        {children && children[activeIndex]}
      </div>
    </div>
  )
}

export default Tabs
