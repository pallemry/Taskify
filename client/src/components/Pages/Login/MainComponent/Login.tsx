import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import Headings from '../../Home/Headings/Headings';
import './Login.css'
import $ from 'jquery'
import Password from '../Password/PasswordComponent/Password';
import PasswordInputField from '../Password/PasswordInputField/PasswordInputField';
import { ROUTES } from '../../../../routes/routes';

type Props = React.PropsWithChildren & {
}

export default function Login({ }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    function submitClick(e: React.MouseEvent<HTMLInputElement>) {
        $('.errors').css('animation', 'shake .5s infinite')
        setTimeout(() => {
            $('.errors').css('animation', '')
        }, 500)
    }

    return (
        <motion.div className="login-container" ref={ref}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className="login-form-wrapper">
                <Headings labels={['login-here']} className='login-header' />
                <form id='form' className="login-form" ref={formRef}>
                    <div className="input-group">
                        <label htmlFor='email'>Email: </label>
                        <input type="text"
                            className='login__input'
                            name='email'
                            id='email'
                            placeholder="John@host.domain"
                            pattern={`(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])`}
                            required
                        ></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor='password'> Password: </label>
                        <Password placeholder="j0hn">
                            <PasswordInputField placeholder="j0hn" showPasswordButton={true}/>
                        </Password>
                    </div>

                    <input type='submit'
                        className='submit-button'
                        value='Log in'
                        onClick={submitClick}></input>
                </form>
                <div className="extra-buttons">
                    <Link to={ROUTES.signup} className="extra-button sign-up">Sign up</Link>
                    <Link to={ROUTES.forgotpassword} className="extra-button forgot-password">Forgot password</Link>
                </div>
            </div>
        </motion.div>
    )
}


