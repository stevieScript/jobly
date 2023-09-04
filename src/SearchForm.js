import {useState} from 'react';
import './SearchForm.css';

const SearchForm = ({search}) => {
	const [searchValue, setSearchValue] = useState('');

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		search(searchValue.trim() || undefined);
		setSearchValue('');
	};

	return (
		<div className='SearchForm mb-4'>
			<form className='form-inline' onSubmit={handleSubmit}>
				<input
					value={searchValue}
					onChange={handleChange}
					type='text'
					placeholder='Search'
					name='searchTerm'
					className='form-control form-control-lg flex-grow-1'
				/>
				<button type='submit' className='btn btn-primary'>
					SEARCH
				</button>
			</form>
		</div>
	);
};

export default SearchForm;

