import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
import config from "../../config";
import { ROUTES } from '../../routes/routes';
import { IUserContext, UserContext } from '../User/UserProvider';
import './NavBar.css'

type Props = {}

const NavBar = (props: Props) => {
  const { currentUser } = useContext(UserContext) as IUserContext;

  return (
    <>
      <div className="navbar-footer"></div>
      <nav className="navbar">
        <Link to={ROUTES.default} className="heading">Home</Link>
        <Link to={ROUTES.todos} className='nav-item'>Tasks</Link>
        {currentUser ?
          <>
            <Link to={ROUTES.code} className='nav-item'>Code</Link>
          </> :
          <>
            <Link to={ROUTES.login} className='nav-item'>Log in</Link>
            <Link to={ROUTES.signup} className='nav-item'>Sign up</Link>
          </>
        }
      </nav>
      <Outlet />
    </>
  )
}

export default NavBar