// AuthContext.js

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(localStorage.getItem('token'));

    useEffect(() => {
        // Sync authData with local storage
        const token = localStorage.getItem('token');
        if (token) {
            setAuthData(token);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthData(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthData(null);
    };

    const value = useMemo(() => ({
        authData,
        login,
        logout
    }), [authData]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
