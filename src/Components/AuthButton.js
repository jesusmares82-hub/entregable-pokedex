import React from "react";
import { useAuth } from "../Provider/AuthProvider";
import { useHistory } from "react-router-dom";
const AuthButton = () => {
  const history = useHistory();
  console.log(history);
  const { user, signOut } = useAuth();
  return (
    <div>
      {user ? (
        <button
          onClick={() =>
            signOut(() => {
              history.push(`/`);
            })
          }
        >
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
export default AuthButton;
