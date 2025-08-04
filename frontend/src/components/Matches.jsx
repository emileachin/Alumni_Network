import { useEffect, useState } from 'react';
import matchService from '../services/matches';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentFilter, setCurrentFilter] = useState('all');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // Fetch matches from the match service
                const fetchedMatches = await matchService.getMatches(
                    currentFilter === 'all' ? null : currentFilter
                )
                setMatches(fetchedMatches);
            }
            catch (error) {
                console.error('Error fetching matches: ', error);
            }
            finally {
                setLoading(false)
            }
        }

        fetchMatches();
    }, [currentFilter]);

    if (loading) return <div>Loading....</div>

    return (
        <div>
            <h2>Matches</h2>
            <div>
                <label>Filter by: </label>
                <select 
                    value={currentFilter}
                    onChange={({ target }) => setCurrentFilter(target.value)}
                    className="filter-select"
                >
                    <option value="all">All Matches</option>
                    <option value="postSecondaryInstitution">Same Institution</option>
                    <option value="postSecondaryProgram">Same Post Secondary Program</option>
                </select>
            </div>
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