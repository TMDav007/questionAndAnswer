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

export const DropdownMenu = (props) => {
   const DropdownItem = (props) => {
      return (
        <li onClick={(e) => console.log(props)}><a className="">
          {props.children}
        </a></li>
      )
   }

  return (
    <div className="dropdown">
      <ul className="menu-item">
        <DropdownItem id={props.id}> Edit</DropdownItem>
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