import React, { createContext, PropsWithChildren, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import User from '../../Models/User'
import keys from '../../utils/keys.json'

export interface IUserContext {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<IUserContext | null>(null);


export default function UserProvider({ children }: PropsWithChildren) {
const [currentUser, setCurrentUser] = useLocalStorage<User | null>(keys.user, null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}