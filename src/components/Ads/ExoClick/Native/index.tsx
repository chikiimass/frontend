'use client'
import React from 'react';
import Script from 'next/script';

const ExoClickNative = () => {
    return (
        <>
            {/* Load the external ad-provider script */}
            <Script
                async
                strategy="afterInteractive"
                crossOrigin="anonymous"
                src="https://a.magsrv.com/ad-provider.js"
            />

            {/* Define the ad zone */}
            <ins className="eas6a97888e20" data-zoneid="5431322"></ins>

            {/* Alternatively, you can place this initialization in a separate Script component */}
            <Script strategy="afterInteractive">
                {`(AdProvider = window.AdProvider || []).push({"serve": {}});`}
            </Script>
        </>
    );
};

export default ExoClickNative;
