import { audioQuizAction, audioQuizActionTypes, audioQuizState } from "../../types/audioQuiz"
import {AudioContentState} from '../../types/audioQuiz' 

const initialState: audioQuizState = {
    name: '',
    tags: [],
    imgURL: '',
    content: []
}

export const audioQuizReducer = 
    (state = initialState, action: audioQuizAction): audioQuizState => {
        switch (action.type) {
            case audioQuizActionTypes.SET_NAME:
                return {...state, name: action.payload}

            case audioQuizActionTypes.SET_TAGS:
                return {...state, tags: action.payload}

            case audioQuizActionTypes.SET_IMG:
                return {...state, imgURL: action.payload}

            case audioQuizActionTypes.SET_IMAGE_FILE:
                return {...state, imgFile: action.payload}

            case audioQuizActionTypes.SET_ANSWER:
                return {...state, 
                    content: state.content.map(
                        val => val.id===action.payload.id ?
                            {...val, answer: action.payload.value} :
                            val
                )}
                
            case audioQuizActionTypes.SET_SECONDARY_ANSWERS:
                return {...state, 
                    content: state.content.map(
                        val => val.id===action.payload.id ?
                            {...val, secondaryAnswers: action.payload.value} :
                            val
                )}

            case audioQuizActionTypes.SET_AUDIO_URL:
                return {...state, 
                    content: state.content.map(
                        val => val.id===action.payload.id ?
                            {...val, audioURL: action.payload.value} :
                            val
                )}

                case audioQuizActionTypes.SET_AUDIO_FILE:
                    return {...state, 
                        content: state.content.map(
                            val => val.id===action.payload.id ?
                                {...val, audioFile: action.payload.value} :
                                val
                    )}

            case audioQuizActionTypes.ADD_CONTENT:
                return {...state, 
                    content: [...state.content, 
                        {id:action.payload, answer:'',secondaryAnswers:[], audioURL:''}
                    ] 
                }

            case audioQuizActionTypes.REMOVE_CONTENT:
                return {...state, 
                    content: state.content.filter( val => {
                        const removeId = action.payload
                        if (val.id > removeId) {
                            val.id =  val.id - 1
                            return true
                        } else if (val.id === removeId) {
                            return false
                        } else {
                            return true
                        }
                    })
                }
            default:
                return state
        }
}