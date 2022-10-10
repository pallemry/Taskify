import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { checkLowercase, checkNumber, checkUppercase } from '../../../utils/utils';
import Headings from '../../Home/Headings/Headings';
import './Login.css'
import $ from 'jquery'
import { config } from '../../../config';

type Props = React.PropsWithChildren & {
}

interface CheckedError {
    message: string;
    isActive: boolean;
}

interface PasswordCheckedErrors {
    [id: string]: CheckedError;
}

export default function Login({ }: Props) {
    const [passwordErrors, setPasswordErrors] = useState<PasswordCheckedErrors>({
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
    const ref = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
        const password = ((e.currentTarget) as HTMLInputElement).value;
        passwordErrors['length'].isActive = (password.length < config.maxPasswordLength);
        passwordErrors['capital'].isActive = !checkUppercase(password);
        passwordErrors['lowercase'].isActive = !checkLowercase(password);
        passwordErrors['digit'].isActive = !checkNumber(password);
        setPasswordErrors({...passwordErrors})
    }

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
                        <input type="password" name='password'
                            className='login__input'
                            autoComplete='false'
                            pattern={`(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{${config.maxPasswordLength},}`}
                            placeholder="j0hn" required
                            onChange={checkPassword}
                        ></input>
                    </div>
                    <ul className="errors">
                        {
                            Object.values(passwordErrors).map(error => {
                                return (
                                    <li key={error.message} className={error.isActive ? 'error-active' : 'error-non-active'}>
                                        {error.message}
                                    </li>
                                )
                            })
                        }
                    </ul>
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


