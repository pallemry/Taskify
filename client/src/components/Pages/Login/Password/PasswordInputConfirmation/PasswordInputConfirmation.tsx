import React, { useContext, useEffect, useRef } from 'react'
import config from '../../../../../config';
import { IPasswordContext, PasswordContext } from '../PasswordComponent/Password'

type Props = {}

export default function PasswordInputConfirmation({ }: Props) {
    const { disabled, password, placeholder, passwordShown } = useContext(PasswordContext) as IPasswordContext;
    const ref = useRef<HTMLInputElement>(null)

    function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value !== password) {
            e.target.setCustomValidity('Password must match');
        } else e.target.setCustomValidity('');
    }

    return (
        <input type={ passwordShown ? "text" : "password"} name='password'
            className={'login__input'}
            pattern={`(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{${config.maxPasswordLength},}`}
            placeholder={placeholder} required
            onChange={checkPassword}
            disabled={disabled}
            ref={ref}
        ></input>
    )
}