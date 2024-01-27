import { Link } from "react-router-dom"

function Nav(props) {
    
    return (
        <>
            <nav>
                <h3 className='nav-title'>blogr.</h3>
                <div className='nav-buttons'>
                    <Link to='/posts' className='nav-button'>All posts</Link>
                    <Link to='/' className='nav-button'>Home</Link>
                    <Link to='/signup' className='nav-button'>Sign Up</Link>
                    <Link to='/login' className='nav-button'>Log In</Link>
                </div>
            </nav>
        </>
    )
}

export default Nav