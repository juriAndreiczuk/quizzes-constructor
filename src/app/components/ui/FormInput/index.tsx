import { Field, ErrorMessage } from 'formik'
import { IAuthInput } from '@/types/auth.types'

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
      <label htmlFor={inputData.name}>{inputData.label}</label>
      <Field
        id={inputData.name}
        type={inputData.type}
        as={types[inputData.type]}
        name={inputData.name}
        component={types[inputData.type]}
      >
        {children}
      </Field>
      <ErrorMessage
        name={inputData.name}
        component="div"
      />
    </>
  )
}

export default Input
