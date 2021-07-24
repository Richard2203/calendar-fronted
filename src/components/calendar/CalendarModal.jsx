import React from 'react';

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
	// .toDate() retorna la fecha establecida por el objeto startDate
	const [DateStart, setDateStart] = useState(startDate.toDate());
	const [DateEnd, setDateEnd] = useState(endDate.toDate());

	const closeModal = () => {
		console.log('closing...');
	};

	const handleStartDateChange = (e) => {
		setDateStart(e);
	};

	const handleEndDateChange = (e) => {
		setDateEnd(e);
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
			isOpen={true}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
			contentLabel="Example Modal"
			onRequestClose={closeModal}
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className="container">
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
						className="form-control"
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
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
