import {useState} from 'react';

const SearchForm = ({search}) => {
	const [searchValue, setSearchValue] = useState('');

	const handleChanges = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		search(searchValue.trim() || undefined);
		setSearchValue('');
	};

	return (
		<div>
			<form className='form-inline' onSubmit={handleSubmit}>
				<input
					value={searchValue}
					onChange={handleChanges}
					type='text'
					placeholder='Search'
					name='searchTerm'
					className='form-control form-control-lg flex-grow-1'
				/>
				<button type='submit' className='btn btn-lg btn-primary'>
					SEARCH
				</button>
			</form>
		</div>
	);
};

export default SearchForm;

