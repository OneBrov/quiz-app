import React from "react"

interface fieldProps {
    maxLength?: number,
    minLength?: number,
    field: string 
}

interface returningValue {
    isValid: boolean
    message: string
}

export const useFieldValidation = ({field, maxLength = 40, minLength=1}:fieldProps):returningValue => {
    try {
        if (field.length >= minLength && field.length <= maxLength) {
            return {isValid: true, message:''}
        } else {
            return {isValid: false, message: `Some of the fields it too long or too short. Values must be in range ${minLength} — ${maxLength} symbols`}
        }
    } catch (e) {
        console.log(e);
        return {isValid: false, message: `Error when we try to validate your values.`}
    }
}