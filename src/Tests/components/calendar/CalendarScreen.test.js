import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-message-es';
import { act } from '@testing-library/react';

// al momento de hacer un mock de una libreria todas las exportaciones de esa
// libreria dejan de exitir y se vuelven simulaciones que unicamente
// existiran si se indica en el callback de jest.mock.
// jest.mock('../../../actions/events', () => ({
// 	eventStartDelete: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	calendar: {
		events: [],
		activeEvent: null,
	},
	auth: {
		uid: '1234567',
	},
	ui: {
		modelOpen: false,
	},
};

let store = mockStore(initState);
store.dispatch = jest.fn();

Storage.prototype.setItem = jest.fn();

describe('Pruebas en <CalendarScreen/>', () => {
	const wrapper = mount(
		<Provider store={store}>
			<CalendarScreen />
		</Provider>
	);

	test('debe renderizar correctamente el componente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('pruebas con las interacciones del calendar', () => {
		const calendar = wrapper.find('Calendar');

		// simulando messages
		const calendarMsg = calendar.prop('messages');
		expect(calendarMsg).toEqual(messages);

		calendar.prop('onDoubleClickEvent')();
		expect(store.dispatch).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: '[UI] Open Modal',
		});

		// enviando un objeto al metodo onSelectEvent
		calendar.prop('onSelectEvent')({ start: 'algun evento' });
		expect(store.dispatch).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledWith({
			payload: { start: 'algun evento' },
			type: '[Event] Set Active',
		});

		// empleamos act de testing/librery-jest-dom porque al llamar
		// a "onViewChange" realizamos una modificacion en el hook useState
		act(() => {
			//guardando en localStorage
			calendar.prop('onView')('week');
			expect(localStorage.setItem).toHaveBeenCalled();
			expect(localStorage.setItem).toHaveBeenCalledWith(
				'lastView',
				'week'
			);
		});
	});
});
