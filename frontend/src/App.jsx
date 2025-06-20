import { useState, useEffect } from 'react'
import loginService from './services/login'
import alumniService from './services/alumni'
import matchService from './services/matches'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Alumni from './components/Alumni'
import Matches from './components/Matches'
import EditProfile from './components/EditProfile'
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom"
import './app.css';

function App() {
  // State variables
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

      // Set the token 
      alumniService.setToken(user.token)
      matchService.setToken(user.token)
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

      // Set token for future requests
      alumniService.setToken(user.token)
      matchService.setToken(user.token)

      // Set user state
      setUser(user)

      // Navigate to dashboard
      navigate('/dashboard')
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
    alumniService.setToken(null)
    matchService.setToken(null)

    /// Navigate to home page after logout
    navigate('/')
  }

  return (
    <>
      <div>
        <h1>Alumni Network</h1>
        <Link to="/">home     </Link>
        {!user && <Link to="/login">login       </Link>}
        {!user && <Link to="/register">register     </Link>}
        {user && (
                    <>
                        <Link to="/dashboard">dashboard</Link>
                        <br/>
                        <Link to="/dashboard/alumnis">alumni list         </Link>
                        <Link to="/dashboard/matches">matches       </Link>
                        <Link to="/dashboard/editprofile">edit profile    </Link>
                    </>
        )}
      
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          {!user && <Route path="/register" element={<RegisterForm />} />}
          {!user && <Route path="/login" element={
            <LoginForm 
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            errorMessage={errorMessage}
            user={user}
          />
          } />}
          {user && (
                        <>
                            <Route path="/dashboard" element={
                                <>
                                  <h1>Welcome to the dashboard, {user.username}!</h1>
                                  <button onClick={logout}>Logout</button>
                                </>
                            } />
                            <Route path="/dashboard/alumnis" element={<Alumni />} />
                            <Route path="/dashboard/matches" element={<Matches />} />
                            <Route path="/dashboard/editprofile" element={<EditProfile />} />
                        </>
                    )}
          <Route path="*" element={<h1>This page does not exist</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
