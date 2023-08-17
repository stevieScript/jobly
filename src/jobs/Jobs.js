import {useState, useContext, useEffect} from 'react';
import JobDetail from './JobDetail';
import JoblyApi from '../api';
import UserContext from '../auth/UserContext';
import {Navigate} from 'react-router-dom';
function Jobs() {
	const {currentUser} = useContext(UserContext);

	const [jobs, setJobs] = useState([]);

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
			{jobs.map((job) => (
				<JobDetail key={job.id} job={job} />
			))}
		</div>
	);
}

export default Jobs;

