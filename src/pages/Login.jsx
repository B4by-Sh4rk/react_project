import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }
    return (
        <div className='login__page' style={{margin: '50px'}}>
            <h1>
                Login page
                <form onSubmit={login}>
                <MyInput type="text" placeholder="Type login here..."></MyInput>
                <MyInput type="password" placeholder="Type password here..."></MyInput>
                <MyButton>LogIn</MyButton>
                </form>
            </h1>
        </div>
    );
};

export default Login;