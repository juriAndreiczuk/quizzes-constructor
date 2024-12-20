'use client'

import useLogic from '@/app/progres/components/ProgresList/useLogic'
import ContentCard from '@/app/components/layout/ContentCard'
import Button from '@/app/components/ui/Button'
import PageIntro from '@/app/components/layout/PageIntro'

const ProgresList = () => {
  const { completedQuestions } = useLogic()

  return (
    completedQuestions && (
      <>
        <PageIntro
          introTitle='Your progres'
          introButton={{ url: '/', label: 'Back Home' }}
        />
        <ContentCard>
          { completedQuestions.length ? (
            <ul>
              { completedQuestions.map((item, n) => (
                <li
                key={item.questionData.id}
                className={`my-16 ${n && 'border-t-[1px] border-addl pt-16' } sm:mx-16`}
                >
                  <h2 className='text-27 text-white font-medium'>{item.questionData.question}</h2>
                  <div className='sm:pl-32'>
                    <h3 className='text-20 text-white font-normal my-8'>Your answer: </h3>
                    <ul>
                      { item.progres && item.progres.map(({answer}) => (
                        <li
                          className='text-18 text-light ml-16 pl-8 relative'
                          key={answer}
                        >
                          <span className='absolute top-[.05rem] left-0'>&bull;</span>
                          <span className='pl-8'>{answer}</span>
                        </li>
                      )) }
                    </ul>
                  </div>
                </li>
              )) }
            </ul>
          ) : <h2 className='text-27 text-white py-32 text-center font-medium'>You have not answered the questions yet</h2> }
        </ContentCard>
      </>
    )
  )

}

export default ProgresList
