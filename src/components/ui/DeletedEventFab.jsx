import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';
import './FabStyles.css';

const DeletedEventFab = () => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(eventDeleted());
	};

	return (
		<button
			className="btn btn-outline-danger fab-danger"
			onClick={handleDelete}
		>
			<i className="fa fa-trash"></i>
			<span>Borrar Evento</span>
		</button>
	);
};

export default DeletedEventFab;
