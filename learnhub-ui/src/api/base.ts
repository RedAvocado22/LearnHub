import axios, { AxiosRequestConfig } from "axios";
import { refreshToken } from "./auth";

export const API = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true // NOTE: Phải thêm cái này vào server mới nhận được cookie
});

// NOTE: Khi nào gọi api mà cần Authorization thì dùng hàm này
export const requestWithToken = async (url: string, method: string, body?: any) => {
    let token = localStorage.getItem("access_token");
    const config: AxiosRequestConfig = {
        url: `${url}`,
        method: `${method}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    if (body) {
        config.data = body;
    }

    let resp = await API.request(config);
    if (resp.status === 401 || resp.status === 403) {
        // NOTE: Thử tạo token mới nếu request fail
        if (await refreshToken()) {
            resp = await requestWithToken(url, method, body);
        }
    }
    return resp;
};

export default API;
