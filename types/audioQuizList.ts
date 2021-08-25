import { audioQuizState } from "./audioQuiz";

export interface AudioQuizListState {
    audioQuizzes: audioQuizState[]
    error: string;
}

export enum AudioQuizListActionTypes {
    FETCH_AUDIO_QUIZZES = 'FETCH_AUDIO_QUIZZES',
    FETCH_AUDIO_QUIZZES_ERROR = 'FETCH_AUDIO_QUIZZES_ERROR'
}

interface FetchAudioQuizListAction {
    type: AudioQuizListActionTypes.FETCH_AUDIO_QUIZZES
    payload: audioQuizState[]
}

interface FetchAudioQuizListErrorAction {
    type: AudioQuizListActionTypes.FETCH_AUDIO_QUIZZES_ERROR
    payload: string
}

export type AudioQuizListAction = FetchAudioQuizListAction | FetchAudioQuizListErrorAction