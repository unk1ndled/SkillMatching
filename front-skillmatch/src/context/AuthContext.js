import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Sync authData with local storage
        const token = localStorage.getItem('token');
        if (token) {
            setAuthData(token);
            setUserData(jwtDecode(token));
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthData(token);
        setUserData(jwtDecode(token));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthData(null);
        setUserData(null);
    };

    const value = useMemo(() => ({
        authData,
        userData,
        login,
        logout
    }), [authData]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
