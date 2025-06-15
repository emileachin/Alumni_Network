import editService from '../services/edit';
import { useState, useEffect } from 'react';

const EditProfile = () => {
    const [alumnus, setAlumnus] = useState(null)
    const [formData, setFormData] = useState({
        email: '',
        currentCompany: '',
        jobPosition: '',
        linkedin: '',
        firstName: '',
        lastName: ''
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
                    email: alumniData.email || '',
                    currentCompany: alumniData.currentCompany || '',
                    jobPosition: alumniData.jobPosition || '',
                    linkedin: alumniData.linkedin || '',
                    firstName: alumniData.firstName || '',
                    lastName: alumniData.lastName || ''
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
            const newAlumniData = {...alumnus, ...formData}
            await editService.editAlumni(newAlumniData)

            console.log("Successfully replaced in database: ", newAlumniData)
            setFormData({
                email: '',
                currentCompany: '',
                jobPosition: '',
                linkedin: '',
                firstName: '',
                lastName: ''
            })
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
                    User Type: {alumnus.userType}
                </div>
                <div>
                    High School Graduation Year: {alumnus.highschoolGraduationYear}
                </div>
                {alumnus.postSecondaryInstitution && <div>
                    Post Secondary Institution: {alumnus.postSecondaryInstitution}
                </div>}
                {alumnus.postSecondaryGradYear && <div>
                    Post Secondary Grad Year: {alumnus.postSecondaryGradYear}
                </div>}
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
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
            <button type="submit">Save</button>
        </form>
    )
}

export default EditProfile;