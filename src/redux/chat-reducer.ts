import { Dispatch } from "redux";
import { chatAPI, ChatMessageType, StatusType } from "../api/chat-api";
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { FormAction } from 'redux-form';
import { v1 } from 'uuid';

type ChatMessageTypeWithId = ChatMessageType & {id: string}

let initialState = {
    messages: [] as ChatMessageTypeWithId[],
    status: 'pending' as StatusType
};

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED': 
            return {...state, 
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            };
        case 'chat/STATUS_CHANGED': 
            return {...state, 
               status: action.payload.status
            };
        default:
            return state;;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    } as const),
    statusChenged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: {status}
    } as const)
}

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessagesHandler
} 

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChenged(status))
        }
    }

    return _statusChangedHandler
} 


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>