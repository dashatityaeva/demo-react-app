import axios from "axios";

//делаем базовые настройки
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY" : "21bad7e4-4a7c-424d-aba5-459d9de2ef78"
      }
})

export const usersAPI = {
    getUsers(currentPageNumber = 1, pageSize = 100) {
        return instance.get(`users?page=${currentPageNumber}&count=${pageSize}`).then(response => response.data)
    },

    follow(userId) {
        return instance.post(`follow/${userId}`);
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },

    getProfile(userId) {
        console.warn('Please, use profileAPI object instead of usersAPI object');
        return profileAPI.getProfile(userId);
    }
    
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData)
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
} 


export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
   getCaptchaUrl() {
       return instance.get(`security/get-captcha-url`);
   }
}