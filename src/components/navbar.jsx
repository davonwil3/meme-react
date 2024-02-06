import React from "react";

import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav className='navbar'>
                <ul className='nav-links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signin">Signin</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;