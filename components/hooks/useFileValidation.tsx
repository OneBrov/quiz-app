interface fieldProps {
    type: string,
    maxSize?: number,
    file: File 
}

interface returningValue {
    isValid: boolean
    message: string
}

const supportedAudio = /.(mp3|wav|mp4|ogg|webm|flac|oga)$/i
const supportedImage = /.(jpg|jpeg|png|gif)$/i
export const useFileValidation = 
({file, type = 'image', maxSize=8*10**6}:fieldProps):returningValue => {
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