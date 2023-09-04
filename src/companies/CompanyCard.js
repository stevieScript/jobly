import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
import './CompanyCard.css';

function CompanyCard({company}) {
	const {currentUser} = useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<Link className='CompanyCard card' tag={Link} to={`/companies/${company.handle}`}>
			<div className='card-body'>
				<h6 className='card-title'>{company.name}</h6>
				<p>{company.description}</p>
			</div>
		</Link>
	);
}

export default CompanyCard;

