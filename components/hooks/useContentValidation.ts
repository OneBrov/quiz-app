import { AudioContentState } from "../../types/audioQuiz";

interface fieldProps {
    maxLength?: number,
    minLength?: number,
    field: string 
}

interface fileProps {
    type: string,
    maxSize?: number,
    file: File 
}

interface returningValue {
    isValid: boolean
    message: string
}

const supportedAudio = /.(mp3|wav|mp4|ogg|webm|flac|oga|m4a)$/i
const supportedImage = /.(jpg|jpeg|png|gif)$/i

function fieldValidation ({field, maxLength = 40, minLength=1}:fieldProps):returningValue  {
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

const fileValidation = 
({file, type = 'image', maxSize=10**6}:fileProps):returningValue => {
    try {
        if (!file) {
            return {
                isValid: false, 
                message:"Some file are not upload! Please upload all files before validation"
            }
        }
        if (file.size > maxSize) {
            return {
                isValid: false,
                message: `File ${file.name} is too heavy!!! Max size for files =1 MB` 
            }
        }
        if (type === "image" && !file.name.match(supportedImage)) {
            return {
                isValid: false,
                message: `The file ${file.name} is not image!!! Please upload the image`
            }
        }
        if (type === "audio" && !file.name.match(supportedAudio)) {
            console.log(file.type)
            return {
                isValid: false,
                message: `The file ${file.name} have a wrong extension. File type must be in [${"mp3|wav|mp4|ogg|webm|flac"}]}`
            }
        }
        return {
            isValid: true,
            message: ""
        }

    } catch (e) {
        console.log(e);
        return { isValid: false, message: "Unpredicted error during file validation"}
    }
}

export const useContentValidation = (content: AudioContentState[]) => {
    const res:returningValue[] = []
    content.map(val=>{
        res.push( fieldValidation({field: val.answer}))
        res.push(fileValidation({file: val.audioFile, type: "audio"}))
    })
    return res
}