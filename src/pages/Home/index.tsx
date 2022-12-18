import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './Home.scss'
const Home = () => {
    const { auth } = useAuth();
    return (
        <>
            <div className="banner">
                <h1>WELCOME!</h1>
                <h2>{auth.userName || 'Stranger'}</h2>
                <Link to='/products'>Order</Link>
            </div>
        </>
    )
}

export default Home