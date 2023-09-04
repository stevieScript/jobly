import {Form, Label, Button, Alert, Input} from 'reactstrap';
import {useContext, useState} from 'react';
import UserContext from '../auth/UserContext';
import JoblyApi from '../api';
import {useNavigate, Navigate} from 'react-router-dom';

function Profile() {
	const {currentUser, setCurrentUser} = useContext(UserContext);
	const navigate = useNavigate();
	const userDetails = currentUser;

	const [formData, setFormData] = useState({
		username: userDetails.username,
		firstName: userDetails.firstName,
		lastName: userDetails.lastName,
		email: userDetails.email,
		password: '',
	});
	const [formErrors, setFormErrors] = useState([]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let profileData = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				password: formData.password,
			};
			let username = formData.username;
			let updatedUser = await JoblyApi.updateUser(username, profileData);
			setFormData((formData) => ({
				...formData,
				password: '',
			}));

			setCurrentUser(updatedUser);
			navigate('/companies');
		} catch (errors) {
			setFormErrors(errors);
		}
	};
	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='Profile'>
			<div className='container col-md-8 offset-md-4 col-lg-6 offset-lg-3'>
				<h2>Profile</h2>
				<Form onSubmit={handleSubmit}>
					<Label>Username</Label>
					<Input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleChange}
						disabled={true}
					/>
					<Label>First Name</Label>
					<Input type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
					<Label>Last Name</Label>
					<Input type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
					<Label>Email</Label>
					<Input type='email' name='email' value={formData.email} onChange={handleChange} />
					<Label>Confirm password to make changes:</Label>
					<Input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
					{formErrors.length ? (
						<Alert variant='danger'>
							<Alert.Heading>Oops!</Alert.Heading>
							<ul>
								{formErrors.map((error) => (
									<li key={error}>{error}</li>
								))}
							</ul>
						</Alert>
					) : null}
					<Button color='primary' type='submit'>
						Save Changes
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default Profile;

