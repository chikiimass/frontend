'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignInOrProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/users/me', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout', {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      setUser(null); // Update the state immediately
      router.push('/sign-in');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        fetchUser(); // Re-fetch user when token changes
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="relative flex items-center space-x-4 p-2">
      {loading ? (
        <div className="flex items-center gap-4">
          <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
          <div className="skeleton h-6 w-28"></div>
        </div>
      ) : user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <div className='flex items-center gap-4'>
              <div className="avatar online">
                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-1">
                  <img
                    src={user.iconType === 'upload' ? user.iconUpload.url : user.iconUrl || '/path/to/default/profile-pic.jpg'}
                    alt={user.name || 'Profile'}
                  />
                </div>
              </div>
              <span className='uppercase font-bold'>{user.name}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
          >
            <li>
              <Link href="/settings/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link
            href="/sign-in"
            className="btn btn-primary btn-sm rounded-lg px-4 py-2 font-medium transition-colors duration-300 hover:bg-primary-dark"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="btn btn-secondary btn-sm rounded-lg px-4 py-2 font-medium transition-colors duration-300 hover:bg-secondary-dark"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignInOrProfile;
