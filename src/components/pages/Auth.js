
import React from "react";
import Home from '../pages/Home';
export default function Auth() {
  let token = localStorage.getItem("token");
  if (token) {
    return <Home />;
  }
}