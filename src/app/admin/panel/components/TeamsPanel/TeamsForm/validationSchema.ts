import * as Yup from 'yup'
import messagesData from '@/content/auth.json'

const schema = Yup.object().shape({
  name: Yup.string()
    .required(messagesData.validation.required)
    .min(3, messagesData.validation.name)
})

export default schema
