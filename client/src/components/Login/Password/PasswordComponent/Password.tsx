import React, { useState } from 'react'
import { PasswordCheckedErrors } from '../../PasswordErrors/PasswordErrors';
import { checkLowercase, checkNumber, checkUppercase } from '../../../../utils/utils';
import './Password.css'
import { config } from '../../../../config';

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
    return (
        <PasswordContext.Provider value={{passwordErrors, setPasswordErrors}}>
            {
                props.children
            }
        </PasswordContext.Provider>
    )
}
