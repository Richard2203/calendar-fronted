import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';
import {
	startCheking,
	startLogin,
	startLogout,
	startRegister,
} from '../../actions/auth';
import { types } from '../../types/types';

// importando todo lo del helper "fetch" y asignadolo a la propiedad "fetchModule"
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

// estos mocks son globales en el archivo sin importar su colocacion en el codigo.
// creando un mock de la funcion setItem de localStorage para verificar que se
// haya llamado con los argumentos correspondientes
Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

describe('Pruebas en el action auth', () => {
	beforeEach(() => {
		store = mockStore(initState);
		// si se emplean funciones de jest es buena practica limpiar los mocks
		// antes de cada prueba
		jest.clearAllMocks();
	});

	test('startLogin correcto', async () => {
		await store.dispatch(
			startLogin({ email: 'paquita@gmail.com', password: '1234567890' })
		);

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.authLogin,
			payload: {
				uid: expect.any(String),
				name: expect.any(String),
			},
		});

		// toHaveBeenCalledWith automaticamente hara match con la llamada a la
		// funcion correspondiente, (lo sabra por los argumentos especificados)
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'token',
			expect.any(String)
		);

		// localStorage.setItem.mock.calls retorna un arreglo que contiene
		// las veces que fue llamado, cada vez corresponde con el primer indice
		// y los datos con los que fue llamado (corresponde con el segundo indice)
		expect(localStorage.setItem).toHaveBeenCalledWith(
			// [1] segunda llamada, [0] primer argumento
			localStorage.setItem.mock.calls[1][0],
			// [1] segunda llamada, [1] segundo argumento
			localStorage.setItem.mock.calls[1][1]
		);
	});

	test('startLogin incorrecta', async () => {
		await store.dispatch(
			startLogin({ email: 'p@l.com', password: '9676867' })
		);

		const actions = store.getActions();

		expect(actions).toEqual([]);

		expect(Swal.fire).toHaveBeenCalledWith(
			'Error',
			'las contraseñas son de 8 caracteres o mas',
			'error'
		);
	});

	test('startRegister correcto', async () => {
		// la funcion fetchSinToken retorna una promesa que finalmente retorna
		// puede ser resulta ejecutando un json(); simulamos el retorno que da
		// la funcion json(), esto para no llamar al fetch real y provocar
		// llenado de basura en la BD
		fetchModule.fetchSinToken = jest.fn(() => ({
			// al llamar fetchSinToken retornara la funcion que posteriormente
			// sera mandada a llamar
			json() {
				return {
					name: 'paquito',
					uid: '1234',
					ok: true,
					token: '123456789012345678901234',
				};
			},
		}));

		await store.dispatch(
			startRegister('paquito', 'paquito@gmail.com', '1234567890')
		);

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			payload: { nam: 'paquito', uid: '1234' },
			type: types.authLogin,
		});
	});

	test('startCheking correcto', async () => {
		localStorage.setItem('token', '1234');

		fetchModule.fetchConToken = jest.fn(() => ({
			json() {
				return {
					name: 'paquito',
					uid: '1234',
					ok: true,
					token: '123456789012345678901234',
				};
			},
		}));

		await store.dispatch(startCheking());

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			payload: {
				name: 'paquito',
				uid: '1234',
			},
			type: '[Auth] Login',
		});
	});

	test('startLogout correcto', async () => {
		await store.dispatch(startLogout());
		const actions = store.getActions();

		expect(actions[0]).toEqual({ type: types.authLogout });
		expect(actions[1]).toEqual({ type: types.eventLogout });
		expect(localStorage.clear).toHaveBeenCalled();
	});
});
