import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        dialogsPage: {
            dialogs: [ 
                {id: "1",name: "Masha"},
                {id: "2",name: "peter"},
                {id: "3",name: "grisha"}
            ],
            messages: [ 
                {id: "1",text: "Hi"},
                {id: "2",text: "Hi"},
                {id: "3",text: "lalal"}
            ],
            newTextMessage: ''
        },
        profilePage: {
            posts: [
                {id: 1, post: "Hi", likeCount:11},
                {id: 2, post: "Hi", likeCount:121},
                {id: 3, post: "lalal", likeCount:111},
                {id: 4, post: "lalal", likeCount:111}
            ],
            newPostText: 'Текст поста №1'
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('change UI');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state); //state changed => need change UI

        },
}





window.store = store;
export default store;