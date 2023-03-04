import React from 'react';

import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {
   return (
      <div className="navHome" >
         <Link className="navText" to="/">Back to Home</Link>
      </div>
   );
}

export default Navigation;