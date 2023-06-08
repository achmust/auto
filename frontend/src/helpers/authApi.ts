import { createContext, useContext } from "react";
const AuthApi = createContext({ name: "", password: "" });
export default AuthApi;
