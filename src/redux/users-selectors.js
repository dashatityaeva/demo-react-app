import { createSelector } from 'reselect'

const selectUsersSimple = (state) => {
    return state.usersPageName.users
}


export const selectUsers = createSelector(selectUsersSimple,
    (users) => {
        return users.filter(u => true)
    }
)  

export const selectTotalCount = (state) => {
    return state.usersPageName.totalCount;
}

export const selectPageSize = (state) => {
    return state.usersPageName.pageSize;
}

export const selectCurrentPageNumber = (state) => {
    return state.usersPageName.currentPageNumber;
}

export const selectIsFetching = (state) => {
    return state.usersPageName.isFetching;
}

export const selectFollowingInProgress = (state) => {
    return state.usersPageName.followingInProgress;
}