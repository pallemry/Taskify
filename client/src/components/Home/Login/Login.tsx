import { motion } from 'framer-motion'
import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { getHeightBetweenNavbarAndScreenBottom } from '../../../utils/utils';
import Headings from '../Headings/Headings';
import './Login.css'

type Props = React.PropsWithChildren & {
}

export default function Login({ }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <motion.div className="login-container" ref={ref}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className="login-form-wrapper">
                <Headings labels={['login-here']} className='login-header'/>
                <form className="login-form" onSubmit={(e) => e}>
                    <div className="input-group">
                        <label htmlFor='email'> Email: </label>
                        <input type="email" name='email' placeholder="John@host.domain"></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor='password'> Password: </label>
                        <input type="password" name='password' placeholder="j0hn"></input>
                    </div>
                    <input type='submit'></input>
                </form>
                <div className="extra-buttons">
                    <Link to={ROUTES.signup} className="extra-button sign-up">Sign up</Link>
                    <Link to={ROUTES.forgotpassword} className="extra-button forgot-password">Forgot password</Link>
                </div>
            </div>
        </motion.div>
    )
}


