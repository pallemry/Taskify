import React, { useContext } from 'react'
import { PasswordContext, IPasswordContext } from '../PasswordComponent/Password'

type Props = {}

export default function PasswordErrorList({ }: Props) {
    const { passwordErrors } = useContext(PasswordContext) as IPasswordContext;

    return (
        <ul className={'errors'}>
            {
                Object.values(passwordErrors).map(error => {
                    return (
                        <li key={error.message} 
                        className={`error  ${error.isActive ? 'error-active' : 'error-non-active'}`}>
                            {error.message}
                        </li>
                    )
                })
            }
        </ul>
    )
}