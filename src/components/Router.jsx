import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Error from './main/Error';
import AllPosts from './main/AllPosts'
import SignUp from './auth/SignUp'
import LogIn from './auth/LogIn'
import ActivePost from './main/ActivePost';

const Router = () => {
    const [posts, setPosts] = useState([]);
    const [apiResponse, setApiResponse] = useState(false)

    const [user, setUser] = useState(null);

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
            const credentials = {
                username: loginUsername,
                password: loginPassword
            }

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
            if (data.message) {
                setMessage(data.message);
            }
            console.log(data)
            setUser(data);
        
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
            element: <AllPosts posts={posts}/>,
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
                        signedUp={signedUp} />,
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
            element: <ActivePost />,
            errorElement: <Error />
        },
    ]);

    return <RouterProvider router={router} />
};

export default Router;