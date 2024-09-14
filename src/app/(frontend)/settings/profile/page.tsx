'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Countdown from '@/components/CountDown';
import SkeletonLoader from './SkeletoProfile';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/sign-in');
                    return;
                }

                const response = await axios.get('/api/users/me', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setUser(response.data.user);
                setNewEmail(response.data.user.email);
                setNewUsername(response.data.user.name);
            } catch (error) {
                setError('Failed to fetch user data.');
                router.push('/sign-in');
            } finally {
                setLoading(false); // Update loading state
            }
        };

        fetchUser();
    }, [router]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsUpdating(true);
        try {
            const token = localStorage.getItem('token');
            await axios.patch('/api/users/me', { email: newEmail, name: newUsername, password: newPassword }, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setSuccess('Profile updated successfully.');
        } catch (error) {
            setError('Failed to update profile.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/users/me', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                const userId = response.data.user.id; // Get user ID

                await axios.delete(`/api/users/${userId}`, { // Delete user by ID
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                localStorage.removeItem('token');
                router.push('/sign-in');
            } catch (error) {
                setError('Failed to delete account.');
            }
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/users/logout', {}, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            localStorage.removeItem('token');
            router.push('/sign-in');
        } catch (error) {
            setError('Failed to log out.');
        }
    };

    if (loading) {
        return <SkeletonLoader />;
    }

    if (!user) {
        // Redirect if no user data
        return <SkeletonLoader />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="card w-full max-w-lg rounded-lg">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-bold mb-4">Profile</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                    <div className="flex items-center justify-center mb-6">
                        <div className="avatar online">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-1">
                                <img
                                    src={user.iconType === 'upload' ? user.iconUpload.url : user.iconUrl || '/path/to/default/profile-pic.jpg'}
                                    alt={user.name || 'Profile'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 text-center">
                        <h3 className="text-xl font-semibold uppercase">{user.name}</h3>
                        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                    <form className="mt-4 space-y-4" onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label htmlFor="new-username" className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                id="new-username"
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="New Username"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="new-email" className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input
                                id="new-email"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="New Email Address"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="new-password" className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="New Password"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="confirm-password" className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                    <div className="mt-6 flex flex-col items-center">
                        <button
                            onClick={handleDeleteAccount}
                            className="btn btn-error w-full mt-4"
                        >
                            Delete Account
                        </button>
                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary w-full mt-4"
                        >
                            Logout
                        </button>
                    </div>
                    <Countdown />
                </div>
            </div>
        </div>
    );
};

export default Profile;
