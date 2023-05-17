import React, { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

//tao AuthContext
export const AuthContext = createContext();

//Bat ki comp dc boc trong AuthProvider la bien children thi dl truyen trong props value - thi toan bo comp nam trong AuthProvider dieu truy xuat dc
export default function AuthProvider({ children }) {
    const [user, setUser] = useState({}); //empty obj
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    //event tu firebase login logout token thi se thuc thi 1 callback
    const auth = getAuth();

    useEffect(() => {
        const unsubcribed = auth.onIdTokenChanged((user) => {
          console.log('[From AuthProvider]', { user });
          if (user?.uid) {
            setUser(user);
            //neu token moi khac token trong local thi reload lai
            if (user.accessToken !== localStorage.getItem('accessToken')) {
              localStorage.setItem('accessToken', user.accessToken);
              window.location.reload();
            }
            setIsLoading(false);
            return;
          }
    
          // reset user info
          console.log('reset');
          setIsLoading(false);
          setUser({});
          localStorage.clear();
          navigate('/login');
        });

        //unmount
        return () => {
            unsubcribed();
        }
    }, [auth])



    return (
    <AuthContext.Provider value={{ user, setUser }}>
        {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
    )
}
