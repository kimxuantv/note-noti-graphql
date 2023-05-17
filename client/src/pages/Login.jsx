import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  //ktr sau khi user login thi tro ve trang Home sd reactHook useContext de lay dl trong Context la user tu AuthProvider
  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // const res = await signInWithPopup(auth, provider);
    const {user: {uid, displayName}} = await signInWithPopup(auth, provider);
    //Login thanh cong
    const {data} = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid,
        name
      }
    }`, variables: {
      uid, 
      name: displayName
    }
  })

    console.log("get Data", { data });
  };

  //ktr user
  // if (user?.uid) {
    if (localStorage.getItem('accessToken')) {
    // navigate("/");
    return <Navigate to ="/" />
  }

  //ktr login moi vao duoc Home trong ProtectedRoute

  return (
    <>
      {/* variant la tao thuoc tinh */}
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        {" "}
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
