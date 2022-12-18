import { createContext, useState } from 'react'

export type User = {
    userName: string,
    password: string,
    roles: number,
    id: string
}
export type RequestStatus = 'idle' | 'pending' | 'success' | 'failure';

type Auth = {
    userName: string,
    password: string,
    status: RequestStatus
}

type AuthContextValue = {
    auth: Auth,
    setAuth: React.Dispatch<React.SetStateAction<Auth>>,
}
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

type AuthProviderProps = {
    children: JSX.Element[] | JSX.Element,
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState({
        userName: '',
        password: '',
        status: 'idle' as RequestStatus
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext
