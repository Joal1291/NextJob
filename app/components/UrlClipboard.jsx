"use client"
import { AiOutlineLink } from 'react-icons/ai';

import React from 'react';
import { ToastContainer, toast ,Zoom} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export default function CopyURL() {

  const copyLinkToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('url copied to clipboard', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
      });
  };

  return (
    <>
    <button onClick={copyLinkToClipboard} className="btn-pill"><AiOutlineLink /> Copy</button>
    <ToastContainer newestOnTop/>
    </>
  );
}
