import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const ProtectedRoute = ({ children, ...props }) => {
  const { user } = useAuth();
  console.log(props);
  return (
    <Route
      {...props}
      render={() => (user ? children : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
