import React from 'react';
 
import { NavLink, Link } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/addcompany">About</Link></li>
       </div>
    );
}
 
export default Navigation;