export interface audioQuizState {
    name: string
    tags: string[]
    imgURL: string
    content: {
        id: number
        answer: string
        secondaryAnswers: string[]
        audioURL: string
    }[]
}

export enum audioQuizActionTypes {
    SET_NAME = "SET_NAME",
    SET_TAGS = "SET_TAGS",
    SET_IMG = "SET_IMG",
    ADD_CONTENT = "ADD_CONTENT",
    REMOVE_CONTENT = "REMOVE_CONTENT",
    SET_ANSWER = "SET_ANSWER",
    SET_SECONDARY_ANSWERS = "SET_SECONDARY_ANSWERS",
    SET_AUDIO_URL = "SET_AUDIO_URL",
}

interface SetNameAction {
    type: audioQuizActionTypes.SET_NAME,
    payload: string
}

interface SetTagsAction {
    type: audioQuizActionTypes.SET_TAGS,
    payload: string[]
}

interface SetIMGAction {
    type: audioQuizActionTypes.SET_IMG,
    payload: string
}

interface SetAnswerAction {
    type: audioQuizActionTypes.SET_ANSWER,
    payload: {id:number, value:string}  
}

interface SetSecondaryAnswersAction {
    type: audioQuizActionTypes.SET_SECONDARY_ANSWERS,
    payload: {id:number, value:string[]}  
}

interface SetAudioURLAction {
    type: audioQuizActionTypes.SET_AUDIO_URL,
    payload: {id:number, value:string}  
}

interface AddContentAction {
    type: audioQuizActionTypes.ADD_CONTENT,
    payload: number
}

interface RemoveContentAction {
    type: audioQuizActionTypes.REMOVE_CONTENT,
    payload: number
}

export type audioQuizAction= 
    SetNameAction 
    | SetTagsAction
    | SetIMGAction
    | SetAnswerAction
    | SetSecondaryAnswersAction
    | SetAudioURLAction
    | AddContentAction
    | RemoveContentAction
