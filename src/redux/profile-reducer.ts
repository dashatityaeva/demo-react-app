import { stopSubmit, FormAction } from 'redux-form';
import { profileAPI } from '../api/profile-api';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
    posts: [
        {id: 1, post: "Hi", likeCount:11},
        {id: 2, post: "Hi", likeCount:121},
        {id: 3, post: "lalal", likeCount:111},
        {id: 4, post: "lalal", likeCount:111}
    ] as Array<PostType>,
    status: '',
    profile: null as ProfileType | null,
};


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'profile-reducer/ADD_POST': 
            let newPost = {
                id: 5,
                post: action.newPostText,
                likeCount: 0
            };
            return {...state,
                posts: [...state.posts, newPost],
            };
        case 'profile-reducer/DELETE_POST': 
            return {...state, posts: state.posts.filter(post => post.id !== action.postId)};
        case 'profile-reducer/SET_USER_PROFILE': 
            return {...state, profile: action.profile };
        case 'profile-reducer/SET_STATUS': 
            return {...state, status: action.status};
        case 'profile-reducer/SAVE_PHOTOS_SUCCESS': 
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType};
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreater: (newPostText: string) => ({type: 'profile-reducer/ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'profile-reducer/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'profile-reducer/SET_STATUS', status: status} as const),
    deletePost: (postId: number)  => ({type: 'profile-reducer/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'profile-reducer/SAVE_PHOTOS_SUCCESS', photos} as const),
}


//thunks
export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));

}


export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data =  await profileAPI.updateStatus(status)

        if(data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    
    } catch (error) {
        //operations do something
    }
}


export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
        if(data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch , getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);
    if(data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getProfile(userId));
        } else {
            throw new Error("userId can`t be null")
        }
    } else {
        dispatch(stopSubmit("profileDataForm", {_error: data.messages[0]}))
        // dispatch(stopSubmit("profileDataForm", {"contacts": {"facebook": data.messages[0]}}))
    
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>