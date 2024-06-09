import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

function useAuth(){
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(null)

    return <AuthContext.Provider value={{isAuth, setIsAuth}}>
        {children}
    </AuthContext.Provider>
}

export {AuthProvider, useAuth}