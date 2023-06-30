import { useState, useEffect } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { ToastContainer, toast } from "react-toastify";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        displayName,
        orders: [
          
        ],
      }).catch((err) => {
        console.log("something went wrong");
      });

      if (res.user) {
        toast.success("Signup Successfull", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/");
        console.log("i navigated to new");
      }

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      toast.error("Some problem!", {
        position: toast.POSITION.TOP_CENTER,
      });
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
