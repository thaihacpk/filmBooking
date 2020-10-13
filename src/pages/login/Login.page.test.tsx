import * as React from 'react';
//Mat
import { NavLink } from "react-router-dom";
// //hook form
import { useForm } from "react-hook-form";
//page_scss
import './Login.page.scss';
//services
import { postUserLogin } from '../../core/services/userManager.service';
//setting
import { userLogin, token } from '../../core/config/setting';
//redux
import { userLoginAction } from '../../core/redux/actions/userManager.action';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

//main

export function LoginPage(props: any) {

    let [stateLogin, setStateLogin] = React.useState({
        values: {
            user: "",
            password: "",
        },
        errors: {
            user: false,
            password: false,
        },
        submitted: false,
    })

    const handleChangInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // let { value, name } = event.target;
        // let newValues = {
        //     ...stateLogin.values,
        //     [name]: value,
        // };
        // let newErrors = {
        //     ...stateLogin.errors,
        //     [name]: value === "" ? true : false,
        // };
        // setStateLogin({ values: newValues, errors: newErrors, submitted: false });
        //    c2: setStateLogin({...stateLogin, [event.target.name] : event.target.value});
    }
    console.log(stateLogin);

    //Check status user and password when onclick button

    //Submit Login
    const dispatch = useDispatch();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        postUserLogin(stateLogin.values)
            .then(res => {
                //add info user to localStorage
                localStorage.setItem(userLogin, JSON.stringify(res.data));
                //add token user to localStorage
                localStorage.setItem(token, res.data.accessToken);
                dispatch(userLoginAction(res.data.taiKhoan));
                alert("Đăng nhập thành công");
                props.history.push('/');
            })
            .catch((err) => {
                console.log({ ...err });
            });

    }
    console.log(stateLogin);

    return (
        <div className="login">
            <img src="/access/images/bg-project.jpg" alt="" />
            <div className="login__content" >
                <form className="login__form" onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="login__user-input">
                        {/* error={stateLogin.errors.user} helperText="Incorrect entry." */}
                        <TextField fullWidth error={stateLogin.errors.user} id="outlined-basic" label="Email or phone number" variant="outlined" style={{ marginBottom: '10px' }} name="user" onChange={handleChangInput} />
                        {/* <span className="text-danger" style={{ color: 'red' }}>{stateLogin.errors.user}</span> */}
                    </div>
                    <div className="login__password-input">
                        <TextField type="password" fullWidth error={stateLogin.errors.password} id="filled-basic" label="Password" variant="outlined" style={{ marginBottom: '10px' }} name="password" onChange={handleChangInput} />
                        {/* <span className="text-danger" style={{ color: 'red' }}>{stateLogin.errors.password}</span> */}
                    </div>
                    <div className="login__submit-btn" >
                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%', padding: '16px' }}>
                            Sign In
                        </Button>
                        <span className="text-danger" style={{ color: 'red' }}>{}</span>

                    </div>
                    <div className="login__register-form" style={{ color: 'black' }}>
                        New to Cinema? &nbsp;
                        <NavLink className="nav-link" to="/register">
                            Sign up now.
                        </NavLink>
                    </div>
                </form>

            </div>
        </div>
    );
}
