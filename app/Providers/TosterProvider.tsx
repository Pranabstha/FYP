'use client';
// Toast notifications are those little messages that briefly appear on a website or app to let you know something happened.
import { Toaster } from "react-hot-toast";


import React from 'react'

const TosterProvider = () => {
  return (
    <Toaster/>// toster is a foreig library which is not adjusted to next JS 13
  )
}

export default TosterProvider;
