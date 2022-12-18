import { useRef } from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
function Header() {
    const { auth, logout } = useAuth();
    const userExtrasRef = useRef<HTMLUListElement | null>(null)
    const toggleUserExtra = () => {
        if (userExtrasRef.current) {
            userExtrasRef.current.classList.toggle('active')
        }
    }
    return (
        <nav className='nav-bar'>
            <div className="container">
                <div className="nav-bar__wrapper">
                    <span className='logo'>LOGO</span>
                    <div className='nav-links'>
                        <Link to='/'>HOME</Link>
                        <Link to='/products'>MENUS</Link>
                        {auth.userName
                            ? <div className='user-name'>
                                <p onClick={toggleUserExtra}>{auth.userName}</p>
                                <ul ref={userExtrasRef} className="user-actions">
                                    <li className="action" onClick={logout}>LOG OUT</li>
                                </ul>
                            </div>
                            : <Link to='/login'>LOG IN</Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header