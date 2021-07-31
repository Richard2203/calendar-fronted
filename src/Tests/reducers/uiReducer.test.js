import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

describe('Pruebas en uiReducer', () => {
	const initState = {
		modalOpen: false,
	};

	test('debe retornar el estado por defecto', () => {
		const value = uiReducer(initState, '');

		expect(value).toEqual(initState);
	});

	test('debe de cambiar el estado del Modal', () => {
		let modalState;

		// abriendo modal
		modalState = uiOpenModal();
		expect({ modalOpen: true }).toEqual(uiReducer(initState, modalState));

		// cerrando modal
		modalState = uiCloseModal();
		expect({ modalOpen: false }).toEqual(uiReducer(initState, modalState));
	});
});
