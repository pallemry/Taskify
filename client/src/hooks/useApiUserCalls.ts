import axios, { AxiosError } from 'axios';
import config from '../config';
import User from '../Models/User';

export default function useApiUserCalls() {
    return {
        postUser: async (user: User) => {
            try {
                const res = await axios.post(`${config.api}/users`, {
                    email: user.email,
                    password: user.password
                });
                return res.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response?.data.reason;
                }
                throw error;
            }
        },
        userExists: async (user: User): Promise<boolean> => {
            try {
                const res = await axios.post(`${config.api}/users/exists`, {
                    email: user.email,
                    password: user.password
                });

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