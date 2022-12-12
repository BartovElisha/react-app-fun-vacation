import { getToken, verifyToken } from "../auth/tokenMenagment";

const serverUrl = 'http://localhost:3000/';

export const getRequest = (endPoint: string): Promise<Response> | null => {
    if(!verifyToken()) {
        return null;
    }

    return  fetch(`${serverUrl}${endPoint}`,{
                method: 'GET',
                headers: {'x-auth-token': getToken()}
            })
}