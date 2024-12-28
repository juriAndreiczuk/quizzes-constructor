import { Field, ErrorMessage } from 'formik'
import { IAuthInput } from '@/types'

const Input = (
  { inputData, children }
  : { inputData: IAuthInput, children?: React.ReactNode }
) => {
  const types: { [key: string]: string } = {
    input: 'input',
    textarea: 'textarea',
    select: 'select'
  }

  return (
    <>
      <label
        className='block px-4 text-white text-16 font-normal mb-8 my-4'
        htmlFor={inputData.name}
      >
        {inputData.label}
      </label>
      <Field
        id={inputData.name}
        type={inputData.type}
        className='block w-full from-white to-light bg-gradient-to-r p-8 rounded-md my-8 focus:outline-addl appearance-none cursor-pointer'
        as={types[inputData.type]}
        name={inputData.name}
        component={types[inputData.type]}
      >
        {children}
      </Field>
      <ErrorMessage
        className='block text-accent text-14 font-normal mb-8'
        name={inputData.name}
        component="div"
      />
    </>
  )
}

export default Input
