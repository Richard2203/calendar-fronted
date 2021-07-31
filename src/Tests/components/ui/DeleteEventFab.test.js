import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import DeletedEventFab from '../../../components/ui/DeletedEventFab';
import { eventStartDelete } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
	eventStartDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <DeletedEventFab/>', () => {
	const wrapper = mount(
		<Provider store={store}>
			<DeletedEventFab />
		</Provider>
	);

	test('debe renderizar correctamente el componente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe disparar eventStartDelete', () => {
		wrapper.find('button').prop('onClick')();

		// el dispatch debio ser llamado con una funcion
		expect(store.dispatch).toHaveBeenCalled();

		// debido a que creere un mock del argumento "eventStartDelete"
		// ya no es posible saber si dispatch fue llamado con ese argumento
		// expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));

		// eventStartDelete debio ser llamado
		expect(eventStartDelete).toHaveBeenCalled();
	});
});
