import React, { useContext, useState } from 'react'
import { config } from '../../../../config';
import { checkLowercase, checkNumber, checkUppercase } from '../../../../utils/utils';
import { PasswordCheckedErrors } from '../../PasswordErrors/PasswordErrors';
import Password, { IPasswordContext, PasswordContext } from '../PasswordComponent/Password';

type Props = {
    placeholder?: string;
}

export default function PasswordInputField({ placeholder }: Props) {
    const { passwordErrors, setPasswordErrors } = useContext(PasswordContext) as IPasswordContext;

    function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
        const password = ((e.currentTarget) as HTMLInputElement).value;
        passwordErrors['length'].isActive = (password.length < config.maxPasswordLength);
        passwordErrors['capital'].isActive = !checkUppercase(password);
        passwordErrors['lowercase'].isActive = !checkLowercase(password);
        passwordErrors['digit'].isActive = !checkNumber(password);
        setPasswordErrors({ ...passwordErrors })
    }
  return (
    <input type="password" name='password'
                className={'login__input'}
                pattern={`(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{${config.maxPasswordLength},}`}
                placeholder={placeholder} required
                onChange={checkPassword}
            ></input>
  )
}