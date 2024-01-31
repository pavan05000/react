import React from 'react'
import { Nav, NavDropdown, NavbarCollapse } from 'react-bootstrap'
import {PersonCircle,Power} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'


const Header = () => {
    const navigate = useNavigate();
  // const role = sessionStorage.getItem('role');
  const userId=sessionStorage.getItem('userName');
  const logout = (e) => {
      e.preventDefault();
      sessionStorage.clear('userId');
      sessionStorage.clear('role');
       navigate('/');
  }
    return (
        <>
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <a className="sidebar-toggle js-sidebar-toggle">
            <i className="hamburger align-self-center" />
          </a>
          <div className="nav-item dropdown">
            <NavbarCollapse className="justify-content-end" style={{marginLeft:"850px"}}>
              <Nav className="mr-auto" style={{ paddingRight: "5px" }} >
                
                <NavDropdown align='end' style={{ borderRight: "none" }}  title={<span>{userId}  &nbsp; <PersonCircle color='#683BA4' size={25} /> &nbsp;</span>} id="basic-nav-dropdown">
                  {/* <NavDropdown.Item href="/usersRegistration">Profile</NavDropdown.Item> */}
                
                  <NavDropdown.Item  onClick={logout}><span><Power size={20} color='orange'/></span> LogOut</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </NavbarCollapse>
          </div>
  
        </nav>
  
      </>
    )
}

export default Header