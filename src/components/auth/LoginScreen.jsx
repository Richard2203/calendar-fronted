import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

const LoginScreen = () => {
	let dispatch = useDispatch();

	const initialLogin = {
		password: '',
		email: '',
	};

	const [formLogin, handleInputChangeLo] = useForm(initialLogin);

	const { email, password } = formLogin;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLogin(formLogin));
	};

	const initialRegister = {
		R_name: '',
		R_email: '',
		R_password: '',
		R_passwordCofirm: '',
	};

	const [formRegister, handleInputChangeRe] = useForm(initialRegister);
	const { R_name, R_email, R_password, R_passwordCofirm } = formRegister;

	const handleRegister = (e) => {
		e.preventDefault();
		if (R_password !== R_passwordCofirm)
			Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
		else dispatch(startRegister(R_name, R_email, R_password));
	};

	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="email"
								value={email}
								onChange={handleInputChangeLo}
							/>
						</div>

						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="password"
								value={password}
								onChange={handleInputChangeLo}
							/>
						</div>

						<div className="form-group">
							<input
								type="submit"
								className="btnSubmit"
								value="Login"
							/>
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={handleRegister}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								value={R_name}
								onChange={handleInputChangeRe}
								name="R_name"
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								value={R_email}
								onChange={handleInputChangeRe}
								name="R_email"
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								value={R_password}
								onChange={handleInputChangeRe}
								name="R_password"
							/>
						</div>

						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								value={R_passwordCofirm}
								onChange={handleInputChangeRe}
								name="R_passwordCofirm"
							/>
						</div>

						<div className="form-group">
							<input
								type="submit"
								className="btnSubmit"
								value="Crear cuenta"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default LoginScreen;
