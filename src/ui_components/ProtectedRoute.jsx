import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import { Navigate, Outlet } from 'react-router-dom'
import api from '@/api'

const ProtectedRoute = ({children}) => {

    const [isAuthorised, setIsAuthorised] = useState(null)

    useEffect(function(){
        authorize().catch(() => setIsAuthorised(false))
    }, [])

    async function refreshToken(){
        const refresh = localStorage.getItem("refresh")

        try{
            const response = await api.post("token_refresh/", {refresh})
            if (response.status === 200){
                localStorage.setItem("access", response.data.access)
                setIsAuthorised(true)
            }

            else{
                setIsAuthorised(false)
            }
        }

        catch(err){
            setIsAuthorised(false)
            console.log(err)
        }
    }

    async function authorize(){
        const token = localStorage.getItem("access")
        if(!token){
            setIsAuthorised(false)
            return
        }

        const decodeToken = jwtDecode(token)
        const expiry_date = decodeToken.exp
        const current_time = Date.now()/1000

        if (current_time > expiry_date){
            await refreshToken()
        }
        else{
            setIsAuthorised(true)
        }
    }
    if (isAuthorised === null){
        return <Spinner/>
    }

  return (
     <>
     { isAuthorised ? <Outlet /> : <Navigate to="/signin"  replace /> }
     </>
  )
}

export default ProtectedRoute