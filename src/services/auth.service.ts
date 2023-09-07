import axios from "axios";

const API_URL = "http://localhost:9000/api/authenticate";

class AuthService {
    login(username: string, password: string) {
        return axios
            .post(API_URL, {
                username,
                password
            })
            .then(response => {
                if (response.data.jwtToken) {
                    localStorage.setItem("jw-token", JSON.stringify(response.data.jwtToken));
                }
                return response.data;
            });
    }

    getCurrentUserToken() {
        const userToken = localStorage.getItem("jw-token");
        if (userToken) return JSON.parse(userToken);
        return null;
    }

    logout() {
        localStorage.removeItem("jw-token");
    }
}

export default new AuthService();