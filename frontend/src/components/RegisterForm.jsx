import { useState } from 'react';
import registerService from '../services/register'; 
import {  useNavigate  } from 'react-router-dom';

const RegisterForm = ({ setErrorMessage }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('')
    const [highschoolGraduationYear, setHighschoolGraduationYear] = useState(0)
    const [typeOfPostSecondary, setTypeOfPostSecondary] = useState('')
    const [provinceOfPostSecondary, setProvinceOfPostSecondary] = useState('')
    const [postSecondaryInstuition, setPostSecondaryInstuition] = useState("")
    const [postSecondaryGradYear, setPostSecondaryGradYear] = useState(0)
    const [currentCompany, setCurrentCompany] = useState('')
    const [jobPosition, setJobPosition] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const navigate = useNavigate()

    const handleRegister = (event) => {
        // Prevent default form submission (page refresh)
        event.preventDefault()

        // Username invalid
        if (username.length < 6) {
            setErrorMessage('Username must be at least 6 characters long')
            return
        }

        // Password invalid
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long')
            return
        }

        // Check highschool graduation year validity
        if (highschoolGraduationYear < 1978 || highschoolGraduationYear > new Date().getFullYear() + 1) {
            setErrorMessage('Invalid high school graduation year')
            return
        }

        // Check post-secondary graduation year validity
        if (postSecondaryGradYear < 1978 || postSecondaryGradYear > new Date().getFullYear() + 1) {
            setErrorMessage('Invalid post-secondary graduation year')
            return
        }

        // Create new user object
        const newUser = {
            firstName,
            lastName,
            username,
            email,
            password,
            userType,
            highschoolGraduationYear,
            postSecondaryInstuition,
            postSecondaryGradYear,
            currentCompany,
            jobPosition,
            linkedin
        }

        // Send new user info to backend
        registerService.register(newUser)
            .then(response => {
                console.log('User registered successfully:', response)
                // Reset form fields
                setFirstName('')
                setLastName('')
                setEmail('')
                setUsername('')
                setPassword('')
                setUserType('')
                setHighschoolGraduationYear(0)
                setTypeOfPostSecondary('')
                setPostSecondaryInstuition('')
                setPostSecondaryGradYear(0)
                setCurrentCompany('')
                setJobPosition('')
                setLinkedin('')
                setSuccessMessage('User registered successfully! You can now log in.')

                // Redirect to login page
                navigate('/login') 
            })
            .catch(error => {
                console.error('Error registering user:', error)
            })
    }

    return (
        <form onSubmit={handleRegister}>
            <div>
                First Name: 
                <input type="text" value={firstName} name="firstName" onChange={({ target }) => setFirstName(target.value)} required />
            </div>
            <div>
                Last Name: 
                <input type="text" value={lastName} name="lastName" onChange={({ target }) => setLastName(target.value)} required />
            </div>
            <div>
                Email: 
                <input type="email" value={email} name="email" onChange={({ target }) => setEmail(target.value)} required />
            </div>
            <div>
                Username: 
                <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} required />
            </div>
            <div>
                Password: 
                <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} required />
            </div>
            <div>
                User Type: 
                <select value={userType} name="userType" onChange={({ target }) => setUserType(target.value)} id="usertype" required>
                    <option value="">Select User Type</option>
                    <option value="Student">Student</option>
                    <option value="Professional">Professional</option>
                </select>
            </div>
            <div>
                High School Graduation Year: 
                <input type="year" value={highschoolGraduationYear} name="highschoolGraduationYear" onChange={({ target }) => setHighschoolGraduationYear(Number(target.value))} required />
            </div>
            <div>
                Type of Post-Secondary:
                <select value={typeOfPostSecondary} name="typeOfPostSecondary" onChange={({ target }) => setTypeOfPostSecondary(target.value)} id="typeOfPostSecondary">
                    <option value="">Select Type</option>
                    <option value="College">College</option>
                    <option value="University">University</option>
                    <option value="None">None</option>
                </select>
            </div>
            {(typeOfPostSecondary != "" && typeOfPostSecondary != "None") && (
                <>
                    <div>
                Province of Post-Secondary Institution:
                <select value={provinceOfPostSecondary} name="provinceOfPostSecondary" onChange={({ target }) => setProvinceOfPostSecondary(target.value)} id="provinceOfPostSecondary">
                    <option value="">Select Province</option>
                    <option value="Alberta">Alberta</option>
                    <option value="British Columbia">British Columbia</option>
                    <option value="Manitoba">Manitoba</option>
                    <option value="New Brunswick">New Brunswick</option>
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Nova Scotia">Nova Scotia</option>    
                    <option value="Ontario">Ontario</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                    <option value="Quebec">Quebec</option>
                    <option value="Saskatchewan">Saskatchewan</option>
                    <option value="Yukon">Yukon</option>
                    <option value="Northwest Territories">Northwest Territories</option>
                    <option value="Nunavut">Nunavut</option>
                </select>
            </div>
            <div>
                {/*Add select options for post secondary instuition based on province*/}
                Post-Secondary Institution: 
                <input type="text" value={postSecondaryInstuition} name="postSecondaryInstuition" onChange={({ target }) => setPostSecondaryInstuition(target.value)} />
            </div>
            <div>
                Post-Secondary Graduation Year: 
                <input type="year" value={postSecondaryGradYear} name="postSecondaryGradYear" onChange={({ target }) => setPostSecondaryGradYear(Number(target.value))} />
            </div>
                </>
            )}
            {userType === 'Professional' && (
                <>
                <div>
                    Current Company: 
                    <input type="text" value={currentCompany} name="currentCompany" onChange={({ target }) => setCurrentCompany(target.value)} />
                </div>
                <div>
                    Job Position:
                    <input type="text" value={jobPosition} name="jobPosition" onChange={({ target }) => setJobPosition(target.value)} />
                </div>
                <div>
                    LinkedIn Profile: 
                    <input type="url" value={linkedin} name="linkedin" onChange={({ target }) => setLinkedin(target.value)} placeholder="www.linkedin.com/in/johndoe/" />
                </div></>
            )}
            <button type="submit">Register</button>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
    )
}

export default RegisterForm;