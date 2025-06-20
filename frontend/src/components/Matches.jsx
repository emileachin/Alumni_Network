import { useEffect, useState } from 'react';
import matchService from '../services/matches';

const Matches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const fetchedMatches = await matchService.getMatches()
                setMatches(fetchedMatches);
            }
            catch (error) {
                console.error('Error fetching matches: ', error);
            }
        }

        fetchMatches();
    }, [])

    return (
        <div>
            <h2>Matches</h2>
            {matches.length > 0 ? (
                <div>
                {matches.map(match => (
                    <div key={match._id} className="match-card">
                        <h3>{match.firstName} {match.lastName}</h3>
                        <a href={`mailto:${match.email}`} target="_blank" rel="noopener noreferrer">Email</a>
                        <p>High School Graduation Year: {match.highschoolGraduationYear}</p>
                        {match.postSecondaryInstitution && <p>Post Secondary Institution: {match.postSecondaryInstitution}</p>}
                        {match.postSecondaryGradYear && <p>Post Secondary Graduation Year: {match.postSecondaryGradYear}</p>}
                        {match.currentCompany && <p>Current Company: {match.currentCompany}</p>}
                        {match.jobPosition && <p>Job Position: {match.jobPosition}</p>}
                        {match.linkedin && <p>LinkedIn: <a href={match.linkedin} target="_blank" rel="noopener noreferrer">{match.linkedin}</a></p>}
                    </div>
                ))}
                </div>
            )
            : <p>You currently have no matches, check later :)</p> }
        </div>
    )
}

export default Matches;