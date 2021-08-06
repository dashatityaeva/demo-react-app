import { instance } from "./api";

type GetCaptchaUrlRespoonseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlRespoonseType>(`security/get-captcha-url`).then(res => res.data);
    }
 }