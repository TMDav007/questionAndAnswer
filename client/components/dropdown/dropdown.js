import React, { useState } from 'react';
import './style.scss';
const DropdownApp = () => {
  return (
    <Navbar>
      <NavItem icon="smiley" />
      <NavItem icon="smiley" />
      <NavItem icon="smiley" />

      <NavItem icon="smiley">

        { /* Dropdown goes here*/}
        
      </NavItem>
    </Navbar>
  );
}

export const DropdownMenu = () => {
   const DropdownItem = (props) => {
      return (
        <li><a className="">
          {props.children}
        </a></li>
      )
   }

  return (
    <div className="dropdown">
      <ul id="menu-item">
      <DropdownItem >Edit</DropdownItem>
      <DropdownItem>Vote</DropdownItem>
      <DropdownItem>Delete</DropdownItem>
      </ul>
    </div>
  )
}

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> {props.children} </ul>
    </nav>
  );
}


const NavItem = (props) => {

  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      
      {open && props.children }
    </li>
  );
}

export default DropdownApp;