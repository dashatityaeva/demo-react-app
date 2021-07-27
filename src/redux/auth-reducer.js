import { authAPI, securityAPI } from "../api/api";
import {stopSubmit} from 'redux-form';

//задавать более уникальное имя
const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null //if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA: 
            return {...state, 
                ...action.payload
            };
        case GET_CAPTCHA_URL_SUCCESS: 
            return {...state, captchaUrl: action.captchaUrl
            };
        default:
            return state;;
    }
}

const setAuthUserData = (id, email, login, isAuth) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}});

const getCaptchaUrlSuccess = (url) => ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl: url});

//использовать не promise, а async-await
export const getAuthUserData = () =>  async (dispatch) => { 
    let response = await authAPI.me()
        
    if (response.data.resultCode === 0) {
        let {email,id, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    } 
}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    //success, get auth data
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }

        let messageError = response.data.messages.length > 0 
            ? response.data.messages[0] 
            : "Some error"
        dispatch(stopSubmit("login" ,{_error: messageError}));
    }
}


export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export default authReducer;