import { useState, useEffect } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom"

function App() {
  // State variables
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Navigation (to redirect to another endpoint)
  const navigate = useNavigate()

  // Check if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      // If user is logged in, set the user
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      // Set the token for future requests (dummy function for now) (funcions would fail without it, constant reloading)
      setToken(`Bearer ${user.token}`)
    }
  }, [])
  
  // Login handler
  const handleLogin = async (event) => {
    event.preventDefault()

    // Call login service
    try {
      // Fetch user data from api
      const user = await loginService.login({ username, password })

      // Save user to local storage in loggedAppUser key
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
      setUser(user)

      // Navigate to home page
      navigate('/')
    }
    // Error handling
    catch (error) {
      setErrorMessage('Wrong credentials')
      console.log(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
    setToken
  }

  return (
    <>
      <div>
        <h2>Log in to application</h2>
        <Link to="/">home     </Link>
        <Link to="/register">register     </Link>
        <Link to="/login">login       </Link>
        <Link to="/register">register</Link>
      
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={
            <LoginForm 
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            errorMessage={errorMessage}
            logout={logout}
            user={user}
          />
          } />
        </Routes>
      </div>
    </>
  )
}

export default App
