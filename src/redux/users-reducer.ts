import { UserType } from './../types/types';
import { updateObjectToArray } from "../utils/objects-helpers";
import { InferActionsTypes, BaseThunkType } from './redux-store';
import { Dispatch } from 'redux';
import { usersAPI } from '../api/users-api';
import { APIResponseType } from '../api/api';


let initialState = {
    users: [] as Array<UserType>,
    totalCount: 0,
    pageSize: 100,
    currentPageNumber: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
    filter: {
        term: "",
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'users/FOLLOW': 
            return {
                ...state,
                users: updateObjectToArray( state.users, action.userId, "id", {followed: true} )
            }
        case 'users/UNFOLLOW': 
            return {
                ...state,
                users:updateObjectToArray( state.users, action.userId, "id", {followed: false} )
            }
        case 'users/SET_USERS': 
            return {...state, users: action.users}
        case 'users/SET_TOTAL_COUNT': 
            return {...state, totalCount: action.count }
        case 'users/SET_CURRENT_PAGE': 
            return {...state, currentPageNumber: action.currentPageNumber }
        case 'users/TOGGLE_IS_FETCHING': 
            return {...state, isFetching: action.isFetching }
        case 'users/TOGGLE_FOLLOWING_PROGRESS': 
            return {...state, 
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'users/SET_FILTER':
            return {...state, filter: action.payload}
        default:
            return state;
    }
}

//actions

export const actions = {
    followSuccess: (id: number) => ({type: 'users/FOLLOW', userId: id} as const),
    unfollowSuccess: (id: number) => ({type: 'users/UNFOLLOW', userId: id} as const),
    setUsers: (userchiki: Array<UserType>) => ({type: 'users/SET_USERS', users: userchiki} as const),
    setTotalCount: (totalCount: number) => ({type: 'users/SET_TOTAL_COUNT', count: totalCount} as const),
    setCurrentPage: (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPageNumber: currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'users/SET_FILTER', payload: filter} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'users/TOGGLE_FOLLOWING_PROGRESS', isFetching, userId} as const),
}

//thunk
//пример замыкания currentPageNumber и pageSize!!!

export const getUsers = (currentPageNumber: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPageNumber));
        dispatch(actions.setFilter(filter));
    
        let data = await usersAPI.getUsers(currentPageNumber, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: (userId: number)=>Promise<APIResponseType>, actionCreator: (userId: number) => ActionsTypes ) => {
    dispatch(actions.toggleFollowingProgress(true, userId));

    let response = await apiMethod(userId);

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }

    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId,  usersAPI.follow.bind(usersAPI), actions.followSuccess );
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId,  usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess );
    }
}

export default usersReducer;

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>