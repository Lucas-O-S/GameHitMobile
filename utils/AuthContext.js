import React, { createContext, useState, useEffect } from 'react';
import { AuthHelper } from './AuthHelper';
import UserController from '../Controller/User.Controller';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
        const token = await AuthHelper.getAccessToken();
        if (token && !AuthHelper.isTokenExpired()) {
            const roleId = await AuthHelper.getUserRole();
            setUser({ token, roleId });
        }
        setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(email, password) {
        const response = await UserController.login(email, password); 
        
        const roleId = await AuthHelper.getUserRole();
        setUser({ roleId }); 
    }

    async function signOut() {
        await AuthHelper.clearAccessToken();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
        {children}
        </AuthContext.Provider>
    );
}