import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import CalendarRouter from '../../../components/routers/CalendarRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();

describe('Pruebas en <CalendarRouter/>', () => {
	test('debe renderizar correctamente el componente', () => {
		const initState = { auth: { checking: true } };
		const store = mockStore(initState);
		const wrapper = mount(
			<Provider store={store}>
				<CalendarRouter />
			</Provider>
		);

		expect(wrapper).toMatchSnapshot();
	});

	test('debe de mostrar el calendarScreen si esta autenticado', () => {
		const initState = {
			auth: { checking: false, uid: '123456' },
			ui: { modal: false },
			calendar: { events: [] },
		};
		const store = mockStore(initState);
		const wrapper = mount(
			<Provider store={store}>
				<CalendarRouter />
			</Provider>
		);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('NavBar').exists()).toBe(true);
		expect(wrapper.find('Calendar').exists()).toBe(true);
		expect(wrapper.find('AddNewFab').exists()).toBe(true);
		expect(wrapper.find('CalendarModal').exists()).toBe(true);
	});

	test('debe de mostrar el loginScreen si no esta autenticado', () => {
		const initState = {
			auth: { checking: false },
			ui: { modal: false },
		};
		const store = mockStore(initState);
		const wrapper = mount(
			<Provider store={store}>
				<CalendarRouter />
			</Provider>
		);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('.login-container').exists()).toBe(true);
		expect(wrapper.find('form').exists()).toBe(true);
	});
});
