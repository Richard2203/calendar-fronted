import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LoginScreen from '../../components/auth/LoginScreen';
import { act } from '@testing-library/react';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
}));

jest.mock('../../actions/auth', () => ({
	startRegister: jest.fn(),
	startLogin: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <LoginScreen/>', () => {
	const wrapper = mount(
		<Provider store={store}>
			<LoginScreen />
		</Provider>
	);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('debe renderizar correctamente el componente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe llamar startLogin con los argumentos correspondientes', () => {
		act(() => {
			wrapper.find('input[name="email"]').prop('onChange')({
				target: {
					name: 'email',
					value: 'paquita@gmail.com',
				},
			});
		});

		act(() => {
			wrapper.find('input[name="password"]').prop('onChange')({
				target: {
					name: 'password',
					value: '1234567890',
				},
			});
		});

		act(() => {
			wrapper.find('form').at(0).prop('onSubmit')({
				preventDefault() {},
			});
		});

		expect(startLogin).toHaveBeenCalledWith(expect.any(Object));
	});

	test('debe llamar startRegister con los argumentos correspondientes', () => {
		wrapper.find('input[name="R_name"]').simulate('change', {
			target: {
				name: 'R_name',
				value: 'paquita',
			},
		});

		wrapper.find('input[name="R_email"]').simulate('change', {
			target: {
				name: 'R_email',
				value: 'paquita@gmail.com',
			},
		});

		wrapper.find('input[name="R_password"]').simulate('change', {
			target: {
				name: 'R_password',
				value: '1234567890',
			},
		});

		wrapper.find('input[name="R_passwordC"]').simulate('change', {
			target: {
				name: 'R_passwordC',
				value: '1234567890',
			},
		});

		wrapper.find('form').at(1).prop('onSubmit')({
			preventDefault() {},
		});

		expect(startRegister).toHaveBeenCalledWith(
			'paquita',
			'paquita@gmail.com',
			'1234567890'
		);
	});

	test('debe llamar a fire con los argumentos correspondientes', () => {
		wrapper.find('input[name="R_name"]').simulate('change', {
			target: {
				name: 'R_name',
				value: 'paquita',
			},
		});

		wrapper.find('input[name="R_email"]').simulate('change', {
			target: {
				name: 'R_email',
				value: 'paquita@gmail.com',
			},
		});

		wrapper.find('input[name="R_password"]').simulate('change', {
			target: {
				name: 'R_password',
				value: '1234567890',
			},
		});

		wrapper.find('input[name="R_passwordC"]').simulate('change', {
			target: {
				name: 'R_passwordC',
				value: '12340',
			},
		});

		wrapper.find('form').at(1).prop('onSubmit')({ preventDefault() {} });

		expect(Swal.fire).toHaveBeenCalled();
		expect(Swal.fire).toHaveBeenCalledWith(
			'Error',
			'Las contraseñas no coinciden',
			'error'
		);
	});
});
