import React from "react";
import { useAuth } from "../Provider/AuthProvider";
const AuthButton = () => {
  const { user, signOut } = useAuth();
  return (
    <div>
      {user ? <button onClick={() => signOut(() => {})}>Logout</button> : ""}
    </div>
  );
};
export default AuthButton;
