import React, { useState } from "react";

const UsrLoggedIn = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const isLoggedIn = !!token;
  return isLoggedIn
};

export default UsrLoggedIn;
