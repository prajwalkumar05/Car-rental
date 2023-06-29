import React from 'react'
import { useSignUp } from '../../hooks/useSignUp';

const Signup = () => {

    const {signup} = useSignUp();

   const signUpEmail="prajwa@gmail.com"
   const signUpPassword="123456"
   const signUpUsername="prajwal"

    const onSignUpSubmit = async () => {
       
        await signup(signUpEmail,signUpPassword,signUpUsername)
      
      };

  return (
    <div>
        <button onClick={onSignUpSubmit}>Sign up</button>
    </div>
  )
}

export default Signup