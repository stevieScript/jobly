import {useState, useContext, useEffect} from 'react';
import JobDetail from './JobDetail';
import JoblyApi from '../api';
import SearchForm from '../SearchForm';
import UserContext from '../auth/UserContext';
import {Navigate} from 'react-router-dom';
function Jobs() {
	const {currentUser} = useContext(UserContext);

	const [jobs, setJobs] = useState([]);

	const search = async (searchTerm) => {
		const jobs = await JoblyApi.getJobs(searchTerm);
		setJobs(jobs);
	};

	useEffect(() => {
		const getJobs = async () => {
			const jobs = await JoblyApi.getJobs();
			setJobs(jobs);
		};
		getJobs();
	}, []);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='Jobs'>
			<SearchForm search={search} />
			{jobs.length === 0 && <h3>No results found</h3>}
			{jobs.map((job) => (
				<JobDetail key={job.id} job={job} />
			))}
		</div>
	);
}

export default Jobs;

