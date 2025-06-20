import { useState, useEffect } from 'react'
import alumniService from '../services/alumni'

const Alumni = () => {
    const [alumni, setAlumni] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                const data = await alumniService.getAll()
                console.log('Fetched alumni:', data) // Debug log
                setAlumni(data)
            } catch (error) {
                console.error('Error fetching alumni:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchAlumni()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!alumni?.length) return <div>No alumni found</div>

    return (
        <div>
            <h2>Alumni List </h2>
            {alumni.map(alumnus => (
                <div key={alumnus.id} className="alumni-card">
                    <h3>{alumnus.firstName} {alumnus.lastName}</h3>
                    <p>High School Graduation Year: {alumnus.highschoolGraduationYear}</p>
                    {alumnus.postSecondaryInstitution && <p>Post Secondary Institution: {alumnus.postSecondaryInstitution}</p>}
                    {alumnus.postSecondaryGradYear && <p>Post Secondary Graduation Year: {alumnus.postSecondaryGradYear}</p>}
                    {alumnus.currentCompany && <p>Current Company: {alumnus.currentCompany}</p>}
                    {alumnus.jobPosition && <p>Job Position: {alumnus.jobPosition}</p>}
                    {alumnus.linkedin && <p>LinkedIn: <a href={alumnus.linkedin} target="_blank" >{alumnus.linkedin}</a></p>}
                </div>
            ))}
        </div>
    )
}

export default Alumni