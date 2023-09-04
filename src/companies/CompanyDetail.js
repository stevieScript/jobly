import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useParams} from 'react-router-dom';
import JobCardList from '../jobs/JobCardList';
import JoblyApi from '../api';
import {useContext, useState, useEffect} from 'react';
// import './Company.css';
// import '../jobs/JobCard.css';

function CompanyDetail() {
	const {currentUser} = useContext(UserContext);
	const {handle} = useParams();
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(true);

	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		const getJobs = async () => {
			const jobs = await JoblyApi.getJobs();
			setJobs(jobs);
		};
		getJobs();
	}, []);

	useEffect(() => {
		async function getCompany() {
			try {
				const companyData = await JoblyApi.getCompany(handle);
				setCompany(companyData);
			} catch (err) {
				// Handle the error as needed
				console.error(err);
			}
			setLoading(false);
		}

		getCompany();
	}, [handle]);

	let companyJobs = jobs.filter((job) => job.companyHandle === handle);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='CompanyDetail col-md-8 offset-md-2'>
			<h4>{company.name}</h4>
			<p>{company.description}</p>
			<JobCardList jobs={companyJobs} />
		</div>
	);
}

export default CompanyDetail;

