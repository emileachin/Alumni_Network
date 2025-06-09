const LoginForm = ({
    username, 
    password,
    handleLogin, 
    handleUsernameChange,
    handlePasswordChange,
    errorMessage
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
        </>
    )
}

export default LoginForm

