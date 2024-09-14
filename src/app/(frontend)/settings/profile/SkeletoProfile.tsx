'use client';
import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="card w-full max-w-lg rounded-lg p-4">
                <div className="card-body">
                    {/* Avatar Skeleton */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="avatar">
                            <div className="w-24 h-24 rounded-full skeleton"></div>
                        </div>
                    </div>
                    {/* Text Skeletons */}
                    <div className="mb-4 text-center">
                        <div className="h-6  skeleton mb-2 w-3/4 mx-auto"></div>
                        <div className="h-4  skeleton w-1/3 mx-auto"></div>
                    </div>
                    {/* Form Skeletons */}
                    <form className="mt-4 space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  skeleton h-4 w-1/3 inline-block"></span>
                            </label>
                            <div className="input input-bordered w-full  skeleton h-10"></div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  skeleton h-4 w-1/3 inline-block"></span>
                            </label>
                            <div className="input input-bordered w-full  skeleton h-10"></div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  skeleton h-4 w-1/3 inline-block"></span>
                            </label>
                            <div className="input input-bordered w-full  skeleton h-10"></div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  skeleton h-4 w-1/3 inline-block"></span>
                            </label>
                            <div className="input input-bordered w-full  skeleton h-10"></div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4  skeleton h-10"
                        />
                    </form>
                    {/* Buttons Skeletons */}
                    <div className="mt-6 flex flex-col items-center">
                        <div className="btn btn-error w-full mt-4  skeleton h-10"></div>
                        <div className="btn btn-secondary w-full mt-4  skeleton h-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
