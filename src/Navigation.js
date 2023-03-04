import React from 'react';

import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {
   return (
      <div className="navHome" >
         <Link className="navText" to="/usertime">Back to Home</Link>
      </div>
   );
}

export default Navigation;