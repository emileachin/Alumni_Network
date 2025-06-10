const LoginForm = ({
    username, 
    password,
    handleLogin, 
    handleUsernameChange,
    handlePasswordChange,
    errorMessage,
    logout,
    user
}) => {
    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    username: 
                    <input type="text" value={username} name="Username" onChange={handleUsernameChange} />                   
                </div>
                <div>
                    password:
                    <input type="password" value={password} name="Password" onChange={handlePasswordChange} />
                </div>
                <button type="submit">login</button>
            </form>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button onClick={logout}>Logout</button>
            <div>
                {user ? <p>{user.name} logged in</p> : <p>Not logged in</p>}
            </div>
        </>
    )
}

export default LoginForm

