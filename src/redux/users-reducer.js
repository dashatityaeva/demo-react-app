import { usersAPI } from "../api/api";
import { updateObjectToArray } from "../utils/objects-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    totalCount: 0,
    pageSize: 100,
    currentPageNumber: 1,
    isFetching: false,
    followingInProgress: [2,3]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: 
            return {
                ...state,
                users: updateObjectToArray( state.users, action.userId, "id", {followed: true} )
            }
        case UNFOLLOW: 
            return {
                ...state,
                users:updateObjectToArray( state.users, action.userId, "id", {followed: false} )
            }
        case SET_USERS: 
            return {...state, users: action.users}
        case SET_TOTAL_COUNT: 
            return {...state, totalCount: action.count }
        case SET_CURRENT_PAGE: 
            return {...state, currentPageNumber: action.currentPageNumber }
        case TOGGLE_IS_FETCHING: 
            return {...state, isFetching: action.isFetching }
        case TOGGLE_FOLLOWING_PROGRESS: 
            return {...state, 
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

//actions

export const followSuccess  = (id) => ({type: FOLLOW, userId: id});
export const unfollowSuccess = (id) => ({type: UNFOLLOW, userId: id});
export const setUsers = (userchiki) => ({type: SET_USERS, users: userchiki});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, count: totalCount});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPageNumber: currentPage});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress= (isFetching, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId});


//thunk
//пример замыкания currentPageNumber и pageSize!!!

export const getUsers = (currentPageNumber, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPageNumber));
    
        usersAPI.getUsers(currentPageNumber, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
        });
    }
}


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));

    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }

    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId,  usersAPI.follow.bind(usersAPI), followSuccess );
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId,  usersAPI.unfollow.bind(usersAPI), unfollowSuccess );
    }
}




export default usersReducer;

