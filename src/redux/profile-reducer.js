import { profileAPI, usersAPI } from "../api/api";
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTOS_SUCCESS = 'profile-reducer/SAVE_PHOTOS_SUCCESS';


let initialState = {
    posts: [
        {id: 1, post: "Hi", likeCount:11},
        {id: 2, post: "Hi", likeCount:121},
        {id: 3, post: "lalal", likeCount:111},
        {id: 4, post: "lalal", likeCount:111}
    ],
    newPostText: 'Текст поста №1',
    profile: null,
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: 
            let newPost = {
                id: 5,
                post: action.newPostText,
                likeCount: 0
            };
            return {...state,
                posts: [...state.posts, newPost],
            };
        case DELETE_POST: 
            return {...state, posts: state.posts.filter(post => post.id !== action.postId)};
        case SET_USER_PROFILE: 
            return {...state, profile: action.profile };
        case SET_STATUS: 
            return {...state, status: action.status};
        case SAVE_PHOTOS_SUCCESS: 
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state;
    }
}

export const addPostActionCreater = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status: status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTOS_SUCCESS, photos});

//thunks
export const getProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            });
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            });
    }
}

export const updateStatus = (status) => async (dispatch) => {
    try {
        const response = profileAPI.updateStatus(status)

        if(response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    
    } catch (error) {
        //operations do something
    }
}


export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
        if(response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if(response.data.resultCode === 0) {
        dispatch(getProfile(userId));
    } else {
        dispatch(stopSubmit("profileDataForm", {_error: response.data.messages[0]}))
        // dispatch(stopSubmit("profileDataForm", {"contacts": {"facebook": response.data.messages[0]}}))
    
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;