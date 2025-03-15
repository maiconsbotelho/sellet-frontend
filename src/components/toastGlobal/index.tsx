"use client";
import { ToastContainer } from "react-toastify";

//Styles
import "react-toastify/dist/ReactToastify.css";

export default function ToastGlobal() {
  return (
    <ToastContainer
      className="text-[.8rem] tracking-tighter"
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}
