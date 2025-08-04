import { useEffect, useState } from 'react';
import matchService from '../services/matches';

const Matches = () => {
    const [allMatches, setAllMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentFilter, setCurrentFilter] = useState('all');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                const matches = await matchService.getMatches();
                setAllMatches(matches);
                setFilteredMatches(matches);
            } catch (error) {
                console.error('Error fetching matches:', error);
                setError('Failed to load matches');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []); // Only fetch once on mount

    const handleFilterChange = (event) => {
        const filterType = event.target.value;
        setCurrentFilter(filterType);

        if (filterType === 'all') {
            setFilteredMatches(allMatches);
            return;
        }

        const filtered = allMatches.filter(match => {
            switch (filterType) {
                case 'postSecondaryInstitution':
                    return match.matchType === 'exact' ? true : match.matchType === 'sameUniversity';
                case 'postSecondaryProgram':
                    return match.matchType === 'exact' ? true : match.matchType === 'sameProgram';
                default:
                    return true;
            }
        });

        setFilteredMatches(filtered);
    };

    if (loading) return <div>Loading....</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <h2>Matches</h2>
            <div>
                <label htmlFor="filter-select">Filter by: </label>
                <select 
                    id="filter-select"
                    value={currentFilter}
                    onChange={handleFilterChange}
                >
                    <option value="all">All Matches</option>
                    <option value="postSecondaryInstitution">Same Institution</option>
                    <option value="postSecondaryProgram">Same Post Secondary Program</option>
                </select>
            </div>
            {filteredMatches.length > 0 ? (
                <div>
                {filteredMatches.map(match => (
                    <div key={match._id} className="match-card">
                        <h3>{match.firstName} {match.lastName}</h3>
                        <a href={`mailto:${match.email}`} target="_blank" rel="noopener noreferrer">Email</a>
                        <p>High School Graduation Year: {match.highschoolGraduationYear}</p>
                        {match.postSecondaryInstitution && <p>Post Secondary Institution: {match.postSecondaryInstitution}</p>}
                        {match.postSecondaryGradYear && <p>Post Secondary Graduation Year: {match.postSecondaryGradYear}</p>}
                        {match.postSecondaryProgram && <p>Post Secondary Program: {match.postSecondaryProgram}</p>}
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