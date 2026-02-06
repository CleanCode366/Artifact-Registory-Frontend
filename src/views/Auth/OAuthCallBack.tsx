import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { logout } from "@/utils/auth";
import AuthContext from "@/context/AuthContextType";
import { authStore } from "@/store/authStore";
import { authClient } from "@/utils/http/clients/authClient.client";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const completeLogin = async () => {
      try {
        const res = await authClient.post("/auth/refresh");

        authCtx.setToken(res.data.auth_token);
        authStore.setToken(res.data.auth_token);
        navigate("/feed");
      } catch {
        logout();
        navigate("/login");
      }
    };

    completeLogin();
  }, []);

  return <CircularProgress/>;
};

export default OAuthCallback;
