import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import './AddNewFab.css';

const AddNewFab = () => {
	const dispatch = useDispatch();
	const handleOpenModal = () => {
		dispatch(uiOpenModal());
	};

	return (
		<button
			className="btn btn-outline-primary fab"
			onClick={handleOpenModal}
		>
			<i className="fas fa-plus"></i>
		</button>
	);
};

export default AddNewFab;
