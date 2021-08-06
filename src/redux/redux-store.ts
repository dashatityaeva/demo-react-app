import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import { ThunkAction } from 'redux-thunk';
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
    app: appReducer,
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer, 
    usersPageName: usersReducer,
    auth: authReducer,
    chat: chatReducer,
    form: formReducer,
});

type RootReducerType = typeof rootReducer // (globalstate:AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//createStore - создание store из redux-библиотеки
//используем applyMiddleware, чтобы добавить thunk middleware к стору
// let store = createStore(reducers, applyMiddleware(thunkMiddleware)); 

//connect redux-extension
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store