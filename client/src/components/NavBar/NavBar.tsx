import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { config } from "../../config";
import { ROUTES } from '../../routes/routes';
import './NavBar.css'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <>
    <nav className="navbar">
      <Link to={ROUTES.default} className="heading">Home</Link>
      <Link to={ROUTES.todos} className='nav-item'>Tasks</Link>
      <Link to={ROUTES.login} className='nav-item'>Log in</Link>
    </nav>
    <Outlet />
    </>
  )
}

export default NavBar