import { Form, Label, Input } from 'reactstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyApi from '../api';
// import './Signup.css';

function Signup() {
	const history = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let token = JoblyApi.signup(formData);
		if (token) {
			localStorage.setItem('token', token);
			history.push('/companies');
		}
		handleChange(e, formData);
	};

	return (
		<div className='signup'>
			<h1>Signup</h1>
			<Form handleSubmit={handleSubmit}>
				<Label htmlFor='username'>Username</Label>
				<Input
					type='text'
					name='username'
					id='username'
				/>
				<Label htmlFor='password'>Password</Label>
				<Input
					type='password'
					name='password'
					id='password'
				/>
				<Label htmlFor='firstName'>First Name</Label>
				<Input
					type='text'
					name='firstName'
					id='firstName'
				/>
				<Label htmlFor='lastName'>Last Name</Label>
				<Input
					type='text'
					name='lastName'
					id='lastName'
				/>
				<Label htmlFor='email'>Email</Label>
				<Input
					type='email'
					name='email'
					id='email'
				/>
			</Form>
		</div>
	);
}

export default Signup;
