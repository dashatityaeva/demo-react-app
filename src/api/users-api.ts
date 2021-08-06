import { APIResponseType, GetItemsType, instance } from "./api";



export const usersAPI = {
    getUsers(currentPageNumber = 1, pageSize = 100, term: string = "", friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPageNumber}&count=${pageSize}&term=${term}` + (friend === null ? "" : `&friend=${friend}`))
            .then(res => res.data)
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data);
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    }

}