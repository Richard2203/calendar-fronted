import React from 'react';

// Es posible implementar un modal mediante una libreria externa;
// del enlace https://www.npmjs.com/package/react-modal. Se debe de instalar con:
//  npm i react-modal
import Modal from 'react-modal';
import './calendar_styles.css';

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

const CalendarModal = () => {
	const closeModal = () => {
		console.log('closing...');
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
					<input
						className="form-control"
						placeholder="Fecha inicio"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<input
						className="form-control"
						placeholder="Fecha inicio"
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
