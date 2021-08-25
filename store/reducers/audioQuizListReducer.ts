import { AudioQuizListAction, AudioQuizListActionTypes, AudioQuizListState } from "../../types/audioQuizList"

const initialState: AudioQuizListState = {
    audioQuizzes: [],
    error: ''
}

export const audioQuizListReducer = (state = initialState, action: AudioQuizListAction): AudioQuizListState => {
    switch (action.type) {

        case AudioQuizListActionTypes.FETCH_AUDIO_QUIZZES:
            return {error: '', audioQuizzes: action.payload}

        case AudioQuizListActionTypes.FETCH_AUDIO_QUIZZES_ERROR:
            return {...state, error: action.payload}

        default:
            return state
    }
}