import { isAuthenticated } from "@/utils/auth";
import React from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    setToken: (token: any) => {},
});

export default AuthContext;