import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav>
      <Link to="/user">User Dashboard</Link>
      <Link to="/admin">Admin Dashboard</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;