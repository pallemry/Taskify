import { motion } from 'framer-motion'
import React, { FormEvent, useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Headings from '../../Home/Headings/Headings';
import './Login.css'
import $ from 'jquery'
import Password from '../Password/PasswordComponent/Password';
import PasswordInputField from '../Password/PasswordInputField/PasswordInputField';
import { ROUTES } from '../../../../routes/routes';
import useApiUserCalls from '../../../../hooks/useApiUserCalls';
import useErrorModal from '../../../../hooks/useErrorModal';
import { UserContext } from '../../../User/UserProvider';
import { PreventDefault } from '../../../../utils/utils';

type Props = React.PropsWithChildren & {
}

export default function Login({ }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userExists } = useApiUserCalls();
    const [isLoading, setIsLoading] = useState(false);
    const { setError, modal, error } = useErrorModal();
    const [loggedIn, setLoggedIn] = useState(false);
    const disabled = isLoading || error !== null;
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    async function submitClick(e: FormEvent) {
        e.preventDefault();

        if (!formRef.current?.checkValidity()) {
            // Handle shaking animation
            $('.errors').css('animation', 'shake .5s infinite')
            setTimeout(() => {
                $('.errors').css('animation', '')
            }, 500)
            return;
        }

        try { 
            setIsLoading(true);
            const user = { email, password };
            // Try to add the user to the database
            const exists = await userExists(user);
            // Save the current user if successful
            if (userContext && exists) {
                userContext.setCurrentUser(user);
            } else if (!exists) {
                throw "Password or email incorrect.\n" +
                "If you forgot your password press 'Forgot password'";
            }
            // Redirect the user to the code page, so they can start working
            navigate(ROUTES.code);
        } catch (error) {
            setError(error as string);
        }

        setIsLoading(false);  
    }

    return (
        <motion.div className="login-container" ref={ref}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
            {modal}
            <div className="login-form-wrapper">
                <Headings labels={['login-here']} className='login-header' />
                <form id='form' onSubmit={submitClick} className="login-form" ref={formRef}>
                    <div className="input-group">
                        <label htmlFor='email'>Email: </label>
                        <input type="text"
                            className='login__input'
                            name='email'
                            id='email'
                            placeholder="John@host.domain"
                            pattern={`(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])`}
                            required
                            disabled={disabled}
                            aria-disabled={disabled}
                            value={email}
                            onChange={e => setEmail((e.target as HTMLInputElement).value)}
                        ></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor='password'> Password: </label>
                        <Password 
                        disabled={disabled}
                        placeholder="j0hn">
                            <PasswordInputField 
                            showShowPasswordButton={true}
                            onChange={e => setPassword(e)}/>
                        </Password>
                    </div>

                    <input type='submit'
                        className='submit-button'
                        value='Log in'></input>
                </form>
                <div className="extra-buttons">
                    <Link to={ROUTES.signup} className="extra-button sign-up">Sign up</Link>
                    <Link to={ROUTES.forgotpassword} className="extra-button forgot-password">Forgot password</Link>
                </div>
            </div>
        </motion.div>
    )
}


