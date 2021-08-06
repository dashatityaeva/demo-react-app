import { InferActionsTypes } from './redux-store';


//при первом запуске д.б. 
//начальное состояние (по умолчанию) initialState!
type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    text: string
}

let initialState = {
    dialogs: [ 
        {id: 1,name: "Masha"},
        {id: 2,name: "peter"},
        {id: 3,name: "grisha"},
    ] as Array<DialogsType>,
    messages: [ 
        {id: 1,text: "Hi"},
        {id: 2,text: "Hi"},
        {id: 3,text: "lalal"}
    ] as Array<MessagesType>,
};

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'dialogs/SEND-MESSAGE':
            let newMessage =  action.messageText;
            return {
                ...state,
                messages: [...state.messages, {id: 4, text: newMessage}],
            }
        default:
            return state;
    }
}

export const actions = {
    sendMessage: (messageText: string) => ({type: 'dialogs/SEND-MESSAGE', messageText} as const),
}


export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>