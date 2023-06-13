import React, { useState, useEffect, useContext } from "react";
import '../../styles/Login.css'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useSignUp } from "../../hooks/useSignUp";

const Login = () => {

  const {signup} = useSignUp();
  const {login} = useLogin();

  const [isActive, setIsActive] = useState(false);
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    console.count("component re renders");
  }, []);



  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset: reset2,
  } = useForm();

  const onSignInSubmit = (values) => {
    console.log(values)

    const {signInEmail,signInPassword} = values
    login(signInEmail,signInPassword)
  };

  const onSignUpSubmit = async (values) => {
    const {signUpEmail,signUpPassword,signUpUsername}=values
    await signup(signUpEmail,signUpPassword,signUpUsername)
  
  };

  const handleGoogleLogin = async () => {
   
  };

  return (
    <>
        <section className="section">
          <div className={`cLoginLogin ${isActive && "active"}`}>
            <div className="user signinBx">
              <div className="formBx">
                <form onSubmit={handleSubmit(onSignInSubmit)}>
                  <h1>
                    Welcome to <span className="special">Car Rental</span>
                  </h1>
                  <p className="subtitle">
                    Find your dream Cars and drive it. Lets get started.
                  </p>

                  <div className={`inputBox `}>
                    <input
                      type="email"
                      {...register("signInEmail", {
                        required: "email required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                    ></input>
                    <span>E-mail</span>
                  </div>
                  {errors.signInEmail && (
                    <p className="error-message">
                      {errors.signInEmail.message}
                    </p>
                  )}

                  <div className={`inputBox `}>
                    <input
                      type="password"
                      {...register("signInPassword", {
                        required: "password required",
                        minLength: {
                          value: 6,
                          message: "password is too short",
                        },
                      })}
                    />
                    <span>Password</span>
                  </div>
                  {errors.signInPassword && (
                    <p className="error-message">
                      {errors.signInPassword.message}
                    </p>
                  )}

                  <button
                    className="button"
                    type="submit"
                    
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                  <p className="signup">
                    don't have an account?{" "}
                    <a href="#" onClick={() => setIsActive(!isActive)}>
                      Sign up.
                    </a>
                  </p>
                </form>
              </div>
              <div className="imgBx">
                <div className="gradient">
                 
                </div>
              </div>
            </div>

            <div className="user signupBx">
              <div className="imgBx">
                <img
                  src="https://images.unsplash.com/photo-1600058644231-c99658f408ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                  alt="image"
                />
              </div>
              <div className="formBx">
                <form onSubmit={handleSubmit2(onSignUpSubmit)}>
                  <h2>
                    Create an <span className="special">Account</span>
                  </h2>
                  <div className="inputBox">
                    <input
                      placeholder="example@gmail.com"
                      type="email"
                      {...register2("signUpEmail", {
                        required: "email required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                    ></input>
                    <span>E-mail</span>
                  </div>
                  {errors2.signUpEmail && (
                    <p className="error-message">
                      {errors2.signUpEmail.message}
                    </p>
                  )}

                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="example123"
                      {...register2("signUpUsername", {
                        required: "Username required",
                        minLength: {
                          value: 4,
                          message: "username is too short",
                        },
                      })}
                    ></input>
                    <span>Username</span>
                  </div>
                  {errors2.signUpUsername && (
                    <p className="error-message">
                      {errors2.signUpUsername.message}
                    </p>
                  )}

                  <div className="inputBox">
                    <input
                      type="password"
                      placeholder="6+ strong character"
                      {...register2("signUpPassword", {
                        required: "password required",
                        minLength: {
                          value: 6,
                          message: "password is too short",
                        },
                      })}
                    />
                    <span>Password</span>
                  </div>
                  {errors2.signUpPassword && (
                    <p className="error-message">
                      {errors2.signUpPassword.message}
                    </p>
                  )}

                  <button
                    className="button"
                    type="submit"
                    
                  >
                    {loading ? "Loading..." : "SignUp"}
                  </button>
                  <div className="span-cLoginLogin">
                    <span></span>
                    <p className="ruler-center">Or sign up with</p>
                    <span></span>
                  </div>
                  <div
                    className="google-icon-cLoginLogin"
                    onClick={handleGoogleLogin}
                  >
                    <img
                      
                      className="google-icon"
                      alt="icon"
                    ></img>
                  </div>
                  <p className="signup">
                    Already have an account?
                    <a href="#" onClick={() => setIsActive(!isActive)}>
                      Sign In.
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Login;
