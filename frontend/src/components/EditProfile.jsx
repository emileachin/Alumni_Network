import editService from '../services/edit';
import { useState, useEffect } from 'react';

const EditProfile = () => {
    const [alumnus, setAlumnus] = useState(null)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        userType: '',
        highschoolGraduationYear: 0,
        postSecondaryInstuition: '',
        postSecondaryProgram: '',
        postSecondaryGradYear: 0,
        currentCompany: '',
        jobPosition: '',
        linkedin: ''
    })

    useEffect(() => {
        let fetchAlumni = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
            
            const user = JSON.parse(loggedUserJSON)

            console.log(user)

            editService.setToken(user.token)

            const alumniData = await editService.getAlumni(user.username)
            setAlumnus(alumniData)

            setFormData({
                    firstName: alumniData.firstName || '',
                    lastName: alumniData.lastName || '',
                    username: alumniData.username || '',
                    email: alumniData.email || '',
                    userType: alumniData.userType || '',
                    highschoolGraduationYear: alumniData.highschoolGraduationYear || 0,
                    postSecondaryInstuition: alumniData.postSecondaryInstuition || '',
                    postSecondaryProgram: alumniData.postSecondaryProgram || '',
                    postSecondaryGradYear: alumniData.postSecondaryGradYear || 0,
                    currentCompany: alumniData.currentCompany || '',
                    jobPosition: alumniData.jobPosition || '',
                    linkedin: alumniData.linkedin || ''
            });

            console.log("Successfully fetched", alumniData)
        } catch (error) {
            console.error(error)
            console.log(JSON.parse(window.localStorage.getItem('loggedAppUser')))
        }}
        
        fetchAlumni()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            let linkedinRegex = /^(https?\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/

        // Check LinkedIn URL validity

        if (formData.linkedin && !linkedinRegex.test(formData.linkedin)) {
            return
        }
            
        console.log(formData)

        await editService.editAlumni(formData.username, formData)

        console.log("Successfully replaced in database: ", formData)
        }
        catch (error) {
            console.error(error)
        }

        if (!alumnus) {
            return <div>Loading....</div>
        }
    }

    if (!alumnus) {
    return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
                <div>
                    First Name: {alumnus.firstName}
                </div>
                <div>
                    Last Name: {alumnus.lastName}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    Username: {alumnus.username}
                </div>
                <div>
                User Type: 
                <select value={formData.userType} name="userType" onChange={handleChange} id="usertype" required>
                    <option value="">Select User Type</option>
                    <option value="Student">Student</option>
                    <option value="Professional">Professional</option>
                </select>
                </div>
                <div>
                    High School Graduation Year: {alumnus.highschoolGraduationYear}
                </div>
                {(alumnus.postSecondaryInstitution && alumnus.postSecondaryGradYear) && (
                <>
                <div>
                    Post Secondary Institution: {alumnus.postSecondaryInstitution}
                </div>
                <div>
                    <label>Post Secondary Program: </label>
                    <input
                                type="text"
                                name="postSecondaryProgram"
                                value={formData.postSecondaryProgram}
                                onChange={handleChange}
                    />
                </div>
                <div>
                    Post Secondary Graduation Year: {alumnus.postSecondaryGradYear}
                </div>
                </>)}
                {formData.userType === "Professional" && (
                    <>
                        <div>
                            <label>Current Company:</label>
                            <input
                                type="text"
                                name="currentCompany"
                                value={formData.currentCompany}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Job Position:</label>
                            <input
                                type="text"
                                name="jobPosition"
                                value={formData.jobPosition}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
                <div>
                    <label>LinkedIn:</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                    />
                </div>
            <button type="submit">Save</button>
        </form>
    )
}

export default EditProfile;