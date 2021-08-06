import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'

const selectUsersSimple = (state: AppStateType) => {
    return state.usersPageName.users
}


export const selectUsers = createSelector(selectUsersSimple,
    (users) => {
        return users.filter(u => true)
    }
)  

export const selectTotalCount = (state: AppStateType) => {
    return state.usersPageName.totalCount;
}

export const selectPageSize = (state: AppStateType) => {
    return state.usersPageName.pageSize;
}

export const selectCurrentPageNumber = (state: AppStateType) => {
    return state.usersPageName.currentPageNumber;
}

export const selectIsFetching = (state: AppStateType) => {
    return state.usersPageName.isFetching;
}

export const selectFollowingInProgress = (state: AppStateType) => {
    return state.usersPageName.followingInProgress;
}

export const selectUsersFilter = (state: AppStateType) => {
    return state.usersPageName.filter
}