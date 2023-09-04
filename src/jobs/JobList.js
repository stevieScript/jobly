import {useState, useContext, useEffect} from 'react';
import JobCardList from './JobCardList';
import JoblyApi from '../api';
import SearchForm from '../SearchForm';
import UserContext from '../auth/UserContext';
import {Navigate} from 'react-router-dom';
function JobList() {
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
		<div className='JobList col-md-8 offset-md-2'>
			<SearchForm search={search} />
			{jobs.length ? (
				<JobCardList jobs={jobs} />
			) : (
				<p className='lead'>Sorry, no results were found!</p>
			)}
		</div>
	);
}

export default JobList;

