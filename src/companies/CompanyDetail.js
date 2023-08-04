import {Card} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
// import './CompanyCard.css';

function CompanyCard({company}) {
	const {currentUser} = useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<Card className='CompanyCard'>
			<Link to={`/companies/${company.handle}`}>
				<h3>{company.name}</h3>
				<p>{company.description}</p>
			</Link>
		</Card>
	);
}

export default CompanyCard;

