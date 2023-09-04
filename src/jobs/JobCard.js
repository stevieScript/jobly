import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useParams} from 'react-router-dom';
import JoblyApi from '../api';
import {useContext, useState, useEffect} from 'react';
import './JobCard.css';

function JobCard({job}) {
	const {currentUser, hasAppliedToJob, handleApply} = useContext(UserContext);
	const {handle} = useParams();
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function getCompany() {
			if (!handle) {
				setLoading(false);
				return;
			}
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

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='JobDetail card'>
			<div className='card-body'>
				<h6 className='card-title'>{job.title}</h6>
				<p className='text-capitalize'>{job.companyHandle}</p>
				<p>{job.salary && formatSalary(job.salary)}</p>
				<p>Equity: {job.equity}</p>
				<button
					className='btn btn-danger font-weight-bold text-uppercase float-right'
					onClick={() => handleApply(job.id)}
					disabled={hasAppliedToJob(job.id)}>
					{hasAppliedToJob(job.id) ? 'Applied' : 'Apply'}
				</button>
			</div>
		</div>
	);
}

function formatSalary(salary) {
	const digitsRev = [];
	const salaryStr = salary.toString();

	for (let i = salaryStr.length - 1; i >= 0; i--) {
		digitsRev.push(salaryStr[i]);
		if (i > 0 && i % 3 === 0) digitsRev.push(',');
	}

	return `Salary: ${digitsRev.reverse().join('')}`;
}

export default JobCard;

