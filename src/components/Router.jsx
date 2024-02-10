import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import App from '../App';
import Error from './main/Error';
import AllPosts from './main/AllPosts'
import SignUp from './auth/SignUp'
import LogIn from './auth/LogIn'
import ActivePost from './main/ActivePost';

const Router = () => {
    const [posts, setPosts] = useState([]);
    const [apiResponse, setApiResponse] = useState(false)

    const [user, setUser] = useState(null)

    const userCookie = Cookies.get();

    // connects to server and gets posts via /posts route
    useEffect(() => {
        fetch('https://blogr-production.up.railway.app/api/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
        .then(function() {
            setApiResponse(true)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (userCookie) {
            async function getUser() {
                const response = await fetch('https://blogr-production.up.railway.app/api/user', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: userCookie.user
                    })
                })
    
                    const userData = await response.json();
    
                    if (response.status === 200) {
                        setUser(userData);
                        console.log(user)
                    } 
                }
    
            getUser();
        }
    }, [])

        
    

    // user sign up info captured from form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [signedUp, setSignedUp] = useState(false);

    // sign up handlers
    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleCreateAccount = async(e) => {
        e.preventDefault()
    
        try {
          const response = await fetch(`https://blogr-production.up.railway.app/api/sign_up`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              firstname: firstName,
              lastname: lastName,
              username: userName,
              password: password,
              confirmpassword: confirmPassword
            })
          })

          if (response.status === 200) {
            setSignedUp(true)
          }

        } catch (err) {
          console.error(err)
        }
    }
    
    // log in info captured from form
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLoginUsername = (e) => {
        setLoginUsername(e.target.value)
    }

    const handleLoginPassword = (e) => {
        setLoginPassword(e.target.value)
    }

    const handleVerifyAccount = async(e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://blogr-production.up.railway.app/api/log_in`, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: loginUsername,
                password: loginPassword,
              })
            })
            const data = await response.json();
            console.log(data)
            if (loginUsername === data.user_name) {
                setUser(data);
                setMessage(`Welcome ${user.first_name}, have fun!`);
                Cookies.set('user', user._id, { expires: 0.5 });
            }
            if (data.message) {
                setMessage(data.message);
            }

        } catch(err) {
            console.log(err)
        }
    }   

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App posts={posts} apiResponse={apiResponse} />,
            errorElement: <Error />
        },
        {
            path: '/posts',
            element: <AllPosts posts={posts} user={user} />,
            errorElement: <Error />
        },
        {
            path: '/signup',
            element: <SignUp
                        handleFirstName={handleFirstName}
                        handleLastName={handleLastName}
                        handleUserName={handleUserName}
                        handlePassword={handlePassword}
                        handleConfirmPassword={handleConfirmPassword}
                        handleCreateAccount={handleCreateAccount}
                        signedUp={signedUp}
                        user={user} />,
            errorElement: <Error />
        },
        {
            path: '/login',
            element: <LogIn
                        handleLoginUsername={handleLoginUsername}
                        handleLoginPassword={handleLoginPassword}
                        handleVerifyAccount={handleVerifyAccount}
                        message={message} />,
            errorElement: <Error />
        },
        {
            path: '/posts/activepost',
            element: <ActivePost user={user} />,
            errorElement: <Error />
        },
    ]);

    return <RouterProvider router={router} />
};

export default Router;