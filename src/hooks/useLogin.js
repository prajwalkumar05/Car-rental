import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import { auth, db } from '.././firebase/config'
import { useAuthContext } from './useAuthContext'
import { toast } from 'react-toastify'

export const useLogin = () => {

  const navigate = useNavigate()

  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch,user } = useAuthContext()

  const login = async (email, password) => {
    console.log(email, password)
    setError(null)
    setIsPending(true)
  
    try {
      console.log(email, password)
      // login
      const res = await signInWithEmailAndPassword(auth,email, password)

       if(res.user){
        toast.success("Login Successfull", {
          position: toast.POSITION.TOP_CENTER
        });
        navigate('/')
       }

       console.log("login")

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      toast.error("Signup Successfull", {
        position: toast.POSITION.TOP_CENTER
      });
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}