import * as Yup from 'yup'
import messagesData from '@/content/auth.json'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(messagesData.validation.email)
    .required(messagesData.validation.required),
  password: Yup.string()
    .required(messagesData.validation.required),
  name: Yup.string()
    .min(3, messagesData.validation.name)
})

export default validationSchema
