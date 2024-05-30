import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import Logo from '../components/Logo';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/login', values);
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.data);
                localStorage.setItem('role', values.role);
                navigate('/');
            } else {
                dispatch(hideLoading());
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    };

    const handleRoleSelect = (role) => {
        let credentials;
        switch (role) {
            case 'user':
                credentials = { email: 'usuario@gmail.com', password: '1234', role: 'user' };
                break;
            case 'admin':
                credentials = { email: 'admin@gmail.com', password: '1234', role: 'admin' };
                break;
            case 'employee':
                credentials = { email: 'empleado@gmail.com', password: '1234', role: 'employee' };
                break;
            default:
                return;
        }
        login(credentials);
    };

    return (
        <div className="authentication">
            <div className="authentication-form p-3">
                <div>
                    <Logo />
                </div>
                <Button className="primary-button mt-2 mb-2" onClick={() => handleRoleSelect('user')}>
                    Ingresar como Usuario
                </Button>
                <Button className="primary-button mt-2 mb-2" onClick={() => handleRoleSelect('admin')}>
                    Ingresar como Administrador
                </Button>
                <Button className="primary-button mt-2 mb-2" onClick={() => handleRoleSelect('employee')}>
                    Ingresar como Empleado
                </Button>
            </div>
        </div>
    );
}

export default Login;