import { config } from '../../../../config';
import React, { useContext, useEffect, useRef } from 'react'
import { IPasswordContext, PasswordContext } from '../PasswordComponent/Password'

type Props = {}

export default function PasswordInputConfirmation({ }: Props) {
    const { password, placeholder } = useContext(PasswordContext) as IPasswordContext;
    const ref = useRef<HTMLInputElement>(null)

    function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value, password);
        if (e.target.value !== password) {
            console.log('no match found');
            e.target.setCustomValidity('Password must match');
        } else e.target.setCustomValidity('');
    }

    return (
        <input type="password" name='password'
            className={'login__input'}
            pattern={`(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{${config.maxPasswordLength},}`}
            placeholder={placeholder} required
            onChange={checkPassword}
            ref={ref}
        ></input>
    )
}