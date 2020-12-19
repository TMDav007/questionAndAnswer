import React from 'react'

function CarretLink() {
  return (
    <i className="fa fa-sort-desc menu_icon"  aria-hidden="true" > {
      <div className="dropdown" >
        <ul className='menu-item1' >
          <li>Edit</li>
          <li>Vote</li>
          <li>Delete</li>
        </ul>
      </div> }
    </i>
  )
}

export default CarretLink;
