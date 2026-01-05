import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileCard from './Profilecard';

const Navbar = ({ showAlert }) => {
    const [user, setUser] = useState(null); // User state to store user info
    const [showProfileCard, setShowProfileCard] = useState(false); // State for showing ProfileCard
    const location = useLocation();
    const navigate = useNavigate(); // Hook to navigate to different routes

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://inoteproject.onrender.comgetUser", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'jwtdata': localStorage.getItem('token'),
                    },
                });

                const json = await response.json();
                if (json.success) {
                    setUser({ username: json.user.username, name: json.user.name });
                } else {
                    setUser(null); // If no user data, set to null
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                showAlert("Unable to load user data. Please try again.", "danger");
            }
        };

        // If there's a token in localStorage, fetch the user data
        if (localStorage.getItem('token')) {
            fetchUserData();
        } else {
            setUser(null); // If no token, ensure the user state is null
        }
    }, [showAlert]);

    // Handle user sign-out
    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
        setShowProfileCard(false);
        navigate('/login', { replace: true }); // Ensure that the navigation replaces the current page
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">i-NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" || location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>

                        {/* If user is not logged in, show login/signup buttons */}
                        {!localStorage.getItem('token') ? (
                            <form className="d-flex" role="search">
                                <Link className="btn btn-primary mx-3" role="button" to="/login">Login</Link>
                                <Link className="btn btn-primary mx-3" role="button" to="/signup">Sign Up</Link>
                            </form>
                        ) : (
                            <div className="d-flex">
                                {/* Avatar (or icon) that toggles the ProfileCard */}
                                <button className='btn btn-primary mx-3' onClick={handleSignOut}>
                                        Logout</button>

                                <i 
                                    className="fa-solid fa-user-tie" 
                                    onClick={() => setShowProfileCard(prevState => !prevState)} 
                                    style={{ cursor: 'pointer', fontSize: '1.5rem',backgroundColor: 'grey', padding: '10px', borderRadius: '50%' }} 
                                ></i>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Show the ProfileCard below the navbar on right side, only if user is logged in */}
            {showProfileCard && user && (
                <div style={{ position: 'absolute', top: '60px', right: '20px' }}>
                    <ProfileCard 
                        username={user.username} 
                        name={user.name} 
                        onLogout={handleSignOut} // Pass the logout handler to ProfileCard
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;
