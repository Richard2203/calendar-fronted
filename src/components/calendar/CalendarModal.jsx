import React from 'react';
import Swal from 'sweetalert2';

import moment from 'moment';
// Es posible implementar un modal mediante una libreria externa;
// del enlace https://www.npmjs.com/package/react-modal. Se debe de instalar con:
//  npm i react-modal
import Modal from 'react-modal';

// https://www.npmjs.com/package/react-datetime-picker
// DateTimePicker provee de un componente para fechas, para emplearlo se usa el
// comando npm i react-datetime-picker y la importancion
import DateTimePicker from 'react-datetime-picker';

import './calendar_styles.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

// establecemos el Modal al componente root
Modal.setAppElement('#root');

// minutes(<minuto:number>).seconds(<segundos:number>).add(<number>,'TipTiempo:string')
const startDate = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = startDate.clone().add(1, 'hours');

const CalendarModal = () => {
	const dispatch = useDispatch();
	const { modalOpen } = useSelector((state) => state.ui);

	// .toDate() retorna la fecha establecida por el objeto startDate
	const [DateStart, setDateStart] = useState(startDate.toDate());
	const [DateEnd, setDateEnd] = useState(endDate.toDate());
	const [titleValid, setTitleValid] = useState(true);

	// hook para el manejo del formulario
	const [formValues, setformValues] = useState({
		title: '',
		notes: '',
		start: startDate.toDate(),
		end: endDate.toDate(),
	});

	const { title, note, start, end } = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();

		// asignamos start y end como istancias de "moment" para poder emplear
		// los metodos y propieades de moment
		const momentStart = moment(start);
		const momentEnd = moment(end);

		// <fecha1>.isSameOrAfter(<fecha2>) recibe una instancia de moment
		// y retorna booleano indicando si la fecha1 es mayor o igual a la fecha2
		if (momentStart.isSameOrAfter(momentEnd))
			return Swal.fire(
				'Error',
				'La fecha fin debe se mayor a la fecha de inicio',
				'error'
			);

		if (title.trim().length < 1) return setTitleValid(false);

		dispatch(
			eventAddNew({
				...formValues,
				id: new Date().getTime(),
				user: { uid: 123, name: 'checo perez' },
			})
		);

		setTitleValid(true);
		closeModal();
	};

	const handleInputChange = ({ target }) => {
		setformValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const closeModal = () => {
		dispatch(uiCloseModal());
	};

	const handleStartDateChange = (e) => {
		setDateStart(e);
		setformValues({
			...formValues,
			start: e,
		});
	};

	const handleEndDateChange = (e) => {
		setDateEnd(e);
		setformValues({
			...formValues,
			end: e,
		});
	};

	// El componente "Modal" es un componente de orden superior, es decir
	// tiene etiqueta de apertura y cierre y dentro va el contenido
	return (
		// Estas dos propieades nos permiten aplicar animaciones de cierre
		// del modal
		//      -onAfterOpen={afterOpenModal}
		//      -onRequestClose={closeModal}
		// -isOpen={} recibe un booleano que establece el estado del Modal
		//  (oculto o mostrado)
		// -closeTimeoutMS={} recibe un number en milisegundos para establecer
		//  el efecto de cierre
		<Modal
			isOpen={modalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
			contentLabel="Example Modal"
			onRequestClose={closeModal}
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className="container" onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={DateStart}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						onChange={handleEndDateChange}
						value={DateEnd}
						className="form-control"
						// minDate={} recibe un objeto de tipo fecha
						// establece el tiempo minimo que debe de tener y bloquea
						// las fechas anteriores a ese objeto
						minDate={DateStart}
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${
							!titleValid && 'is-invalid'
						}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						note={title}
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={note}
						onChange={handleInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};

export default CalendarModal;
