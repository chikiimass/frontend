'use client'
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const SearchInput = ({ data }) => {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSeries, setFilteredSeries] = useState([]);
    const dropdownRef = useRef(null);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        // Filter the series data based on the search term
        const results = data.docs.filter((series) =>
            series.name.toLowerCase().includes(term)
        );
        setFilteredSeries(results);
    };

    const handleCardClick = (seriesName) => {
        // Navigate to the series info page
        window.location.href = `/info/${seriesName}`; // Using window.location for navigation
    };

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {/* Mobile Search Icon */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsMobileSearchOpen(true)}
                    className="p-2 text-primary hover:text-secondary focus:outline-none"
                >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </button>
            </div>

            {/* Mobile Fullscreen Search Overlay */}
            {isMobileSearchOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-base-300 p-4">
                    <div className="flex items-center w-full max-w-md mb-4">
                        <button
                            onClick={() => setIsMobileSearchOpen(false)}
                            className="p-2 hover:text-secondary focus:outline-none"
                        >
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="flex-grow px-4 py-2 text-lg bg-transparent outline-none border-b border-base-100 focus:ring-0"
                        />
                    </div>
                    {/* Search results */}
                    <div className="w-full max-w-md">
                        {filteredSeries.length > 0 ? (
                            filteredSeries.map(series => (
                                <div
                                    key={series.id}
                                    className="flex items-center mb-4 cursor-pointer"
                                    onClick={() => handleCardClick(series.name)}
                                >
                                    <img src={series.poster.url} alt={series.name} className="w-16 h-16 object-cover mr-4" />
                                    <div>
                                        <h4 className="text-lg font-semibold">{series.name}</h4>
                                        <p className="text-sm text-gray-500">{new Date(series.releaseddate).getFullYear()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No results found</p>
                        )}
                    </div>
                </div>
            )}

            {/* Desktop Search Input */}
            <div className="hidden lg:flex lg:relative lg:w-full lg:max-w-xl">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full px-4 py-2 text-sm border border-base-100 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="absolute right-0 top-0 mt-2 mr-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </button>

                {/* Dropdown Search Results */}
                {isFocused && (
                    <div ref={dropdownRef} className="absolute top-full bg-base-100 mt-2 w-full rounded-lg shadow-lg">
                        <div className="p-4">
                            {filteredSeries.length > 0 ? (
                                filteredSeries.map(series => (
                                    <div
                                        key={series.id}
                                        className="flex items-center mb-4 cursor-pointer"
                                        onClick={() => handleCardClick(series.name)}
                                    >
                                        <img src={series.poster.url} alt={series.name} className="w-16 h-16 object-cover mr-4" />
                                        <div>
                                            <h4 className="text-lg font-semibold">{series.name}</h4>
                                            <p className="text-sm text-gray-500">{new Date(series.releaseddate).getFullYear()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No results found</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchInput;