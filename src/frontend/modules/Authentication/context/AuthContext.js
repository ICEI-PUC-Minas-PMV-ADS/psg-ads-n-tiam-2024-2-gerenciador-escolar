import React, {createContext, useState, useEffect } from 'react'; 
import { session } from '../services/apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionData = await session();
                setIsAuthenticated(!!sessionData);
            } catch (error) {
                console.error("Erro ao verificar sessão:", error);
                setIsAuthenticated(false);
            }
        };

        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}