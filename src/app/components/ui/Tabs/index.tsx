'use client'

import { useState } from 'react'
import Button from '@/app/components/ui/Button'
import { ITabs } from '@/types/components.types'

const Tabs = ({ children, tabsLabels }: ITabs) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div>
      <div className='flex'>
        { tabsLabels.length && tabsLabels.map((label, index) => (
          <div
            key={label}
            className={`${index === activeIndex ? 'opacity-100' : 'opacity-50'} mb-16 mr-16`}
          >
            <Button
              btnMod='primary-small'
              buttonClick={() => { setActiveIndex(index) }}
            >{ label }</Button>
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
