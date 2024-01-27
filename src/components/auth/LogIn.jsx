import { useState } from "react"
import Nav from "../main/Nav";
import { useNavigate } from "react-router-dom";

export default function LogIn(props) {
    const navigate = useNavigate()

    return (
        <>
            <Nav />
            <form className="signup-form" action="" method="POST" onSubmit={props.handleVerifyAccount}>
                <h2 className='signup-title'>Log In</h2>

                <label htmlFor="username" className='form-label'>Username</label>
                <input type="text" name='username' className='form-input' id='username' onChange={props.handleLoginUsername} />

                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" name='password' className='form-input' id='password' onChange={props.handlePassword} />

                <button className="signup-submit" type="submit">Log In</button>
                <button className="signup-submit" onClick={() => {navigate('/signup')}}>Sign up</button>
                <button className="signup-submit" onClick={() => {navigate('/')}}>Home</button>
            </form>
        </>
    )
}