import { audioQuizAction, audioQuizActionTypes } from "../../types/audioQuiz";

export const setName = (payload: string): audioQuizAction => {
    return { type: audioQuizActionTypes.SET_NAME, payload}
}

export const setTags = (payload: string[]): audioQuizAction => {
    return { type: audioQuizActionTypes.SET_TAGS, payload}
}

export const setImg = (payload: string): audioQuizAction => {
    return { type: audioQuizActionTypes.SET_IMG, payload}
}

export const setImgFile = (payload: File): audioQuizAction => {
    return { type: audioQuizActionTypes.SET_IMAGE_FILE, payload}
}

export const setAnswer = (payload: {id:number, value:string}): audioQuizAction => {
    return { type: audioQuizActionTypes.SET_ANSWER, payload}
}

export const setSecondaryAnswers = (payload: {id:number, value:string[]}): audioQuizAction => {
    return { type: audioQuizActionTypes.SET_SECONDARY_ANSWERS, payload}
}

export const setAudio = (payload: {id:number, value:string}): audioQuizAction => {
    return { type: audioQuizActionTypes.SET_AUDIO_URL, payload}
}

export const setAudioFile = (payload: {id: number, value: File}): audioQuizAction => {
    return { type: audioQuizActionTypes.SET_AUDIO_FILE, payload}
}

export const addContent = (payload: number): audioQuizAction => {
    return { type: audioQuizActionTypes.ADD_CONTENT, payload}
}

export const removeContent = (payload: number): audioQuizAction => {
    return { type: audioQuizActionTypes.REMOVE_CONTENT, payload}
}