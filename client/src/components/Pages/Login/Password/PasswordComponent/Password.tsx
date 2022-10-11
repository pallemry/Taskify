import React, { useState } from 'react'
import { config } from '../../../../../config';
import { PasswordCheckedErrors } from '../../PasswordErrors/PasswordErrors';
import './Password.css'

type Props = React.PropsWithChildren & {
    inputClassName?: string;
    errorListClassName?: string;
    errorClassName?: string;
    errorActiveClassName?: string;
    errorDisabledClassName?: string;
    placeholder?: string;
    showErrorList?: boolean;
}

export interface IPasswordContext {
    passwordErrors: PasswordCheckedErrors;
    setPasswordErrors: React.Dispatch<React.SetStateAction<PasswordCheckedErrors>>;
    password: string | null;
    setPassword: React.Dispatch<React.SetStateAction<string | null>>;
    placeholder: string;
    setPlaceholder: React.Dispatch<React.SetStateAction<string>>;
    passwordShown: boolean;
    setPasswordShown: React.Dispatch<React.SetStateAction<boolean>>
}

export const PasswordContext = React.createContext<IPasswordContext | null>(null)

export default function Password(props: Props) {
    const [passwordErrors, setPasswordErrors] = useState<PasswordCheckedErrors>(
        {
            length: {
                message: 'Must be at least ' + config.maxPasswordLength + ' letters',
                isActive: true
            },
            digit: {
                message: 'Must have at least 1 digit letter',
                isActive: true
            },
            capital: {
                message: 'Must have at least 1 capital letter',
                isActive: true
            },
            lowercase: {
                message: 'Must have at least 1 lowercase letter',
                isActive: true
            }
        });
    const [password, setPassword] = useState<string | null>(null);
    const [placeholder, setPlaceholder] = useState<string>('');
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    return (
        <PasswordContext.Provider value={{
            passwordShown, setPasswordShown, 
            placeholder, setPlaceholder, 
            passwordErrors, setPasswordErrors, 
            password, setPassword}}>
            {
                props.children
            }
        </PasswordContext.Provider>
    )
}
