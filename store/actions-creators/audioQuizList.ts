import axios from "axios"
import { Dispatch } from "react"
import { AudioQuizListAction, AudioQuizListActionTypes } from "../../types/audioQuizList"

export const fetchQuizzes = () => {
    return async (dispatch: Dispatch<AudioQuizListAction>) => {
        try {
            const {data} = await axios.get(process.env.AUDIO_QUIZ_URL)
            dispatch({type: AudioQuizListActionTypes.FETCH_AUDIO_QUIZZES, payload: data})
        } catch (err){
            dispatch({type: AudioQuizListActionTypes.FETCH_AUDIO_QUIZZES_ERROR, payload: 'Произошла ошибка при загрузке квизов'})
        }
    }
}