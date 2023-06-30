import React from 'react';

import { ToastContainer, toast } from 'react-toastify';


function Test(){
  const notify = () => {
    toast.error("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      
    </div>
  );
}

export default Test 