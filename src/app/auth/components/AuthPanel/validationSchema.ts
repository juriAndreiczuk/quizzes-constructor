import * as Yup from 'yup'
import messagesData from '@/content/auth.json'

const schemas = {
  email: Yup.string()
    .email(messagesData.validation.email)
    .required(messagesData.validation.required),
  password: Yup.string()
    .required(messagesData.validation.required),
  displayName: Yup.string()
    .required(messagesData.validation.required)
    .min(3, messagesData.validation.name),
  userType: Yup.string(),
  teamId: Yup.string()
    .when('userType', {
      is: (value: string) => value === 'Player',
      then: () => Yup.string().required(messagesData.validation.required)
    })
}

export const loginSchema = Yup.object().shape({
  email: schemas.email,
  password: schemas.password,
})

export const registrationSchema = Yup.object().shape({
  email: schemas.email,
  password: schemas.password,
  displayName: schemas.displayName,
  teamId: schemas.teamId
})
