import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom'

import './Login.scss'
const Login = () => {
    const { auth, login, changeAuthStatus } = useAuth();
    const navigate = useNavigate();
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setUserInfo(prev => ({ ...prev, [name]: e.target.value }))
    }

    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: ''
    })
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const canSubmit = userInfo.userName && userInfo.password && auth.status === 'idle';
    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (canSubmit) {
            setError('');
            try {
                const existingUser = await login(userInfo);
                if (existingUser) {
                    console.log(auth.status);
                    setError('');
                    setIsModalOpen(true)
                    setTimeout(() => {
                        navigate('../');
                    }, 2000)
                } else {
                    setError('Wrong username or password')
                }

            } catch (err) {
                console.log(err);
                changeAuthStatus('idle')
            }

        }
    }
    return (
        <>
            <div className="signup">
                <form className='signup__form' onSubmit={onLogin}>
                    {error && <div className='error'>{error}</div>}
                    <div className="formGroup">
                        <label htmlFor="userName">User Name:</label>
                        <input type="text" value={userInfo.userName}
                            name='userName'
                            id='userName'
                            onChange={onInputChange} />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Password:</label>
                        <input type="password" value={userInfo.password}
                            name='password'
                            id='password'
                            onChange={onInputChange} />
                    </div>
                    <button>Log In</button>
                    <div className='login-prompt'>
                        No account? <Link to={'../signup'}>Sign up</Link>
                    </div>
                </form>

            </div>
            <Modal isOpen={isModalOpen}>
                <ModalBody>
                    Login success. Navigate to Home in 2s
                </ModalBody>
            </Modal>
        </>
    )
}

export default Login