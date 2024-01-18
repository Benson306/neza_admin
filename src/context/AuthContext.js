import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    const [email, setEmail] = useState(null);
    
    const addUid = (uid) => {
        setUid(uid);
        localStorage.setItem('uid', uid);
    }

    const addEmail = (email) => {
        setEmail(email);
        localStorage.setItem('email',email);
    }

    const logout = () => {
        setEmail(null);
        setUid(null);

        localStorage.removeItem('email');
        localStorage.removeItem('uid');
    }


    const isEmailSet = async () => {
        try{
            let email = localStorage.getItem('email');

            if(email){
                setEmail(email);
            }
        }
        catch(e){
            console.log('error setting email');
        }
    }


    const isUidSet = async () => {
        try{
            let uid = localStorage.getItem('uid');

            if(uid){
                setUid(uid);
            }
        }
        catch(e){
            console.log('error setting uid');
        }
    }

    useEffect(()=>{
        isUidSet();
        isEmailSet();
    },[])

    return (
        <AuthContext.Provider value={{ uid, email, addEmail, addUid, logout}}>
            { children }
        </AuthContext.Provider>
    )
}