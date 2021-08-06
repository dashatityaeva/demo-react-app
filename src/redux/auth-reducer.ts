import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api";
import {stopSubmit} from 'redux-form';
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { Action } from 'redux';
import { FormAction } from 'redux-form';

//задавать более уникальное имя
// const SET_USER_DATA = 'auth/SET_USER_DATA';
// const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null as  (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null, then captcha is not required
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'auth/SET_USER_DATA': 
            return {...state, 
                ...action.payload
            };
        case 'auth/GET_CAPTCHA_URL_SUCCESS': 
            return {...state, 
                captchaUrl: action.captchaUrl
            };
        default:
            return state;;
    }
}

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: 'auth/SET_USER_DATA', payload: {id, email, login, isAuth}} as const
    ),
    getCaptchaUrlSuccess: (url: string) => ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', captchaUrl: url} as const),
}

//использовать не promise, а async-await
export const getAuthUserData = (): ThunkType =>  async (dispatch) => { 
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true));
    } 
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    //success, get auth data
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired ) {
            dispatch(getCaptchaUrl())
        }

        let messageError =loginData.messages.length > 0
            ? loginData.messages[0] 
            : "Some error"
        dispatch(stopSubmit("login" ,{_error: messageError}));
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));

}

export default authReducer;

//типизация
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction >