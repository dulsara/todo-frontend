import axios from "axios";
import {getJWT} from "./functions/jwt-util";

export default axios.create({
    baseURL: "http://localhost:9000/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getJWT()}`
    }
});