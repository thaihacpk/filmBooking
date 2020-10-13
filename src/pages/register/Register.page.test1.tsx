import * as React from 'react';
import { NavLink } from 'react-router-dom';
//Library UI
import { TextField, Button } from '@material-ui/core';
// Scss
import './Register.page.scss';
import { useDispatch } from 'react-redux';
import { postUserRegister } from '../../core/services/userManager.service';
// Components
export function RegisterPage() {
    let [stateReg, setStateReg] = React.useState({
        values: {
            userName: "",
            passWord: "",
            email: "",
            phoneNumber: "",
            fullName: "",
        },
        errors: {
            userName: "",
            passWord: "",
            email: "",
            phoneNumber: "",
            fullName: "",
        }
    })
    const handleChangInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value, name } = event.target;
        let stateError: string = "";
        let checkInput = () => {
            switch (name) {
                case "userName":
                    if (value === "") { stateError = "(*) Please enter username"; return true; }
                    else if (value.indexOf(' ') !== -1) { stateError = "(*) The user can't have spaces"; return true; }
                    else if (value.length <= 5 || value.length >= 20) { stateError = "(*) The user must not be less than 5 characters and exceed 20 characters"; return true; }
                    return false;
                case "passWord":
                    if (value === "") { stateError = "(*) Please enter password"; return true; }
                    else if (value.indexOf(' ') !== -1) { stateError = "(*) The password  can't have spaces"; return true; }
                    else if (value.length <= 5) { stateError = "(*) The password must not be less than 5 characters"; return true; }
                    return false;
                case "email":
                    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (value.match(regexEmail)) {
                        return false;
                    } else {
                        stateError = 'Email not valid ';
                        return true;
                    }
                case "phoneNumber":
                    if (value === "") { stateError = "(*) Please enter Phone Number"; return true; }
                    break;
                case "fullName":
                    if (value === "") { stateError = "(*) Please enter FullName"; return true; }
                    break;
            }
        }
        let newValues = {
            ...stateReg.values,
            [name]: value,
        };
        let newErrors = {
            ...stateReg.errors,
            [name]: checkInput() === true ? stateError : "",
        }
        setStateReg({ values: newValues, errors: newErrors })
    }
    //Submit Register
    console.log(stateReg.values);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // postUserRegister(stateReg.values)
        //     .then(res => {
        //         console.log(res.data);
        //         console.log("oke");
                
        //     })
        //     .catch(error => {
        //         console.log({ ...error });
        //     })
    }
    return (
        <div className="register">
            <img src="/access/images/bg-project.jpg" alt="" />
            <div className="register__content">
                <form action="" className="" onClick={handleSubmit}>
                    <h1>Create an Account</h1>
                    <div className="text-user">
                        <TextField id="outlined-basic" label="Username" variant="outlined" style={{ width: '100%' }} name="userName" onChange={handleChangInput} />
                        <span className="text-danger">{stateReg.errors.userName}</span>
                    </div>
                    <div className="text-passWord">
                        <TextField id="outlined-basic" label="Password" variant="outlined" style={{ width: '100%' }} name="passWord" onChange={handleChangInput} />
                        <span className="text-danger">{stateReg.errors.passWord}</span>
                    </div>
                    <div className="text-email">
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" style={{ width: '100%' }} name="email" onChange={handleChangInput} />
                        <span className="text-danger">{stateReg.errors.email}</span>
                    </div>
                    <div className="text-phoneNumber">
                        <TextField id="outlined-basic" label="Phone Number" variant="outlined" style={{ width: '100%' }} name="phoneNumber" onChange={handleChangInput} />
                        <span className="text-danger">{stateReg.errors.phoneNumber}</span>
                    </div>
                    <div className="text-fullName">
                        <TextField id="outlined-basic" label="FullName" variant="outlined" style={{ width: '100%' }} name="fullName" onChange={handleChangInput} />
                        <span className="text-danger">{stateReg.errors.fullName}</span>
                    </div>
                    <div className="form-submit">
                        <Button variant="contained" color="primary" style={{ width: '100%', padding: '16px' }}>
                            Register my Account
                        </Button>
                    </div>
                    <div className="form-register" style={{ color: 'black' }}>
                        Already a member?
                        <NavLink className="nav-link" to="/login">
                            Log in
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}




