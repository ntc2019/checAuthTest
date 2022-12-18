import React, { useState } from 'react'
import './Signup.scss'
import authAxios from '../../api/auth'
import { Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup';
const Signup = () => {
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: ''
    })

    const { status, signup } = useSignup()
    const [error, setError] = useState('');

    const canSubmit = userInfo.userName && userInfo.password && status === 'idle';

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setUserInfo(prev => ({ ...prev, [name]: e.target.value }))
    }

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (canSubmit) {
            try {
                setError('');
                const res = await signup(userInfo);
                if (res !== -1) {
                    setTimeout(() => {
                        navigate('../login')
                    }, 2000)
                } else {
                    setError('This username already exist')
                }
            } catch (err) {
                setError('Invalid username or password')
                throw err
            }
        }
    }


    return (
        <>
            <div className="signup">
                <form className='signup__form' onSubmit={onSignup}>
                    {error && <p className='error'>{error}</p>}
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
                    <button>Sign Up</button>
                </form>
            </div>

            <Modal isOpen={status === 'success'}>
                <ModalBody>
                    Register succeed. Navigate to Login page in 2s
                </ModalBody>
            </Modal>

        </>
    )
}

export default Signup