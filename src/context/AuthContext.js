import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    const [email, setEmail] = useState(null);
    
    const addUid = (uid) => {
        setUid(uid);
        localStorage.setItem('neza_admin_uid', uid);
    }

    const addEmail = (email) => {
        setEmail(email);
        localStorage.setItem('neza_admin_email',email);
    }

    const logout = () => {
        setEmail(null);
        setUid(null);

        localStorage.removeItem('neza_admin_email');
        localStorage.removeItem('neza_admin_uid');
    }


    const isEmailSet = async () => {
        try{
            let email = localStorage.getItem('neza_admin_email');

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
            let uid = localStorage.getItem('neza_admin_uid');

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