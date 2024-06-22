import React from 'react';
import {Navigate} from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'; 
import { useState, useEffect } from 'react';
import api from '../api';


const ProtectedComp = ({children}) => {
    const [isAutherised, setIsAutherised] = useState (null)
    useEffect(() => {
        auth().catch(() => setIsAutherised(false))
    }, [])

    const refreshToken = async() =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        if (!refreshToken){
            setIsAutherised(false)
            return
        }

        try{
            const access = await api.post("/api/token/refresh/",{refresh:refreshToken})
            if (access.status==200)
            localStorage.setItem(ACCESS_TOKEN,access)
            setIsAutherised(true)
        }catch(e){
            localStorage.removeItem(ACCESS_TOKEN)
            localStorage.removeItem(REFRESH_TOKEN)
            setIsAutherised(false)
            return
        }
    }


    const auth = async() =>{
            const token = localStorage.getItem(ACCESS_TOKEN)

            if (!token){
                setIsAutherised(false)
                return
            }


            try{
                const {exp} = jwtDecode(token)
                if (exp*1000 < new Date().getTime()){
                    refreshToken()
                    return
                }
                setIsAutherised(true)
            }catch(e){
                setIsAutherised(false)
                return
            }
        }

 



    if (isAutherised==null){
        return 
        <div>
            Loading.......
        </div>
    }
  
    return isAutherised ? children : <Navigate to="/login" />;
}

export default ProtectedComp