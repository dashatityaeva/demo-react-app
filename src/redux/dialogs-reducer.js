const SEND_MESSAGE = 'SEND-MESSAGE';

//при первом запуске д.б. 
//начальное состояние (по умолчанию) initialState!

let initialState = {
    dialogs: [ 
        {id: "1",name: "Masha"},
        {id: "2",name: "peter"},
        {id: "3",name: "grisha"},
    ],
    messages: [ 
        {id: "1",text: "Hi"},
        {id: "2",text: "Hi"},
        {id: "3",text: "lalal"}
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage =  action.messageText;
            return {
                ...state,
                messages: [...state.messages, {id: "4", text: newMessage}],
            }
        default:
            return state;
    }
}

export const sendMessageActionCreater = (messageText) => ({type: SEND_MESSAGE, messageText});

export default dialogsReducer;