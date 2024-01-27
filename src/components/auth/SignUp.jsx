import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../main/Nav';

export default function SignUp(props) {
    const navigate = useNavigate();

    return (
        <>
            <Nav />
            <form className="signup-form" action="" method="POST" onSubmit={props.handleCreateAccount}>
                <h2 className='signup-title'>Sign Up</h2>

                <label htmlFor="firstname" className='form-label'>First name</label>
                <input type="text" name='firstname' className='form-input' id='firstname' onChange={props.handleFirstName} />

                <label htmlFor="lastname" className='form-label'>Last name</label>
                <input type="text" name='lastname' className='form-input' id='lastname' onChange={props.handleLastName} />

                <label htmlFor="username" className='form-label'>Username</label>
                <input type="text" name='username' className='form-input' id='username' onChange={props.handleUserName} />

                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" name='password' className='form-input' id='password' onChange={props.handlePassword} />

                <label htmlFor="confirmpassword" className='form-label'>Confirm password</label>
                <input type="password" name='confirmpassword' className='form-input' id='confirmpassword' onChange={props.handleConfirmPassword} />

                <button className="signup-submit" type="submit">Sign Up</button>
                <button className="signup-submit" onClick={() => {navigate('/login')}}>Log in</button>
                <button className="signup-submit" onClick={() => {navigate('/')}}>Home</button>
            </form>
        </>
    )
}