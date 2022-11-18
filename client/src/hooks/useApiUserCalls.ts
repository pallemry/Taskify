import axios, { AxiosError } from 'axios';
import config from '../config';

export type User = {
    email: string;
    password: string;
}

export default function useApiUserCalls() {
    return {
        postUser: async (user: User) => {
            try {
                const res = await axios.post(`${config.api}/users/new`, user);
                return res.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response?.data.reason;
                }
                throw error;
            }
        }
    }
}