import React from "react";
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("User signed out successfully");
            navigate('/signin');
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    };

    return (
        <div>
            <nav className='navbar'>
                <ul className='nav-links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signin">Signin</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;