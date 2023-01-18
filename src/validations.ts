import * as yup from "yup";

export const invalidInputs = [null, 'null', 'undefined', undefined, '']
export const reqMsg = 'Input is required'
export const nullableString = yup.string().nullable(true)
export const reqString = yup.string().required(reqMsg).notOneOf(invalidInputs, reqMsg)
export const yupString = yup.string().notOneOf(invalidInputs, reqMsg)
export const reqNumber = yup.number().required(reqMsg)
export const reqEmail = yup.string().email('Must be a valid email').required("Email is required")
export const email = yup.string().email('Must be a valid email')

const inRegExp = /^(CM|CF)(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{12}$/
// const inRegExp = /^(CM|CF)(\d{8}[A-Z]\d{2}[A-Z])$/
export const reqNin = yup.string().matches(inRegExp, 'Must be a valid NIN').required('NIN is required').notOneOf(invalidInputs, 'NIN is required')

const phoneRegExp = /^(\+256|0)\d{9}$/;
export const phoneNumber = yup.string().matches(phoneRegExp, 'Must be a valid phone number')
export const reqPhoneNumber = yup.string().matches(phoneRegExp, 'Must be a valid phone number').required('Phone number is required').notOneOf(invalidInputs, reqMsg)
