import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { config } from "../../config";
import { ROUTES } from '../../routes/routes';
import './NavBar.css'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <>
    <div className="navbar">
      <Link to={ROUTES.default} className="heading">Taskify</Link>
      <Link to={ROUTES.todos} className='nav-item'>Tasks</Link>
    </div>
    <Outlet />
    </>
  )
}

export default NavBar