import AuthContext, { User } from "../context/AuthContext"
import { useContext } from 'react'
import authAxios from '../api/auth'
import { RequestStatus } from "../context/AuthContext"

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    const auth = authContext.auth;
    const changeAuthStatus = (status: RequestStatus) => {
        authContext.setAuth(prev => ({ ...prev, status }))
    }
    const login = async (userInfo: { userName: string, password: string }) => {
        changeAuthStatus('pending')
        const response = await authAxios.get('');
        const userList: User[] = response.data;
        const existingUser: User | undefined = userList.find(user => (
            user.userName === userInfo.userName &&
            user.password === userInfo.password
        ))
        if (existingUser) {
            changeAuthStatus('idle');
            authContext.setAuth(prev => ({ ...prev, ...userInfo }))
        } else {
            changeAuthStatus('idle');
        }
        return existingUser || null;
    }

    const logout = () => {
        authContext.setAuth(prev => ({ ...prev, userName: '', password: '' }))
    }

    const checkAdmin = async () => {
        const response = await authAxios.get('');
        const userList: User[] = response.data;
        const existingUser: User | undefined = userList.find(user => (
            user.userName === auth.userName &&
            user.password === auth.password
        ))
        if (existingUser) {
            if (existingUser.roles === 100) {
                return true;
            }
        }
        return false;
    }

    return { auth, login, logout, changeAuthStatus, checkAdmin };
}