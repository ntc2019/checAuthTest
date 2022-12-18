import { useState } from 'react'
import authAxios from '../api/auth';
import { RequestStatus, User } from '../context/AuthContext';

export const useSignup = () => {
    const [status, setStatus] = useState<RequestStatus>('idle');
    const signup = async (userInfo: { userName: string, password: string }) => {
        try {
            setStatus('pending');
            const fetchUserResponse = await authAxios.get('');
            const userList: User[] = fetchUserResponse.data;
            const isExisted = userList.filter(user => (
                user.userName === userInfo.userName))
            if (isExisted.length > 0) {
                setStatus('idle');
                return -1;
            } else {
                try {
                    const addUserResponse = await authAxios.post('', {
                        ...userInfo, roles: 200
                    });
                    const data = addUserResponse.data;
                    setStatus('success');
                    return data;
                } catch (err) {
                    setStatus('idle');
                    throw err;
                }

            }
        } catch (err) {
            setStatus('idle');
            throw err
        }
    }

    return { status, signup };
}