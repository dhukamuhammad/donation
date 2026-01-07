"use client";
import React, { useEffect } from 'react'

const ProfilePage = () => {

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        console.log(storedToken);
    }, []);

    return (
        <div>ProfilePage</div>
    )
}

export default ProfilePage