import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = ({ message, type }) => {
  React.useEffect(() => {
    if (message) {
      toast(message, { type });
    }
  }, [message, type]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      closeOnClick
      pauseOnHover
    />
  );
};

export default ToastNotification;
