import * as React from "react";
import { NavLink, Redirect } from "react-router-dom";
//Material UI
import {
    Avatar, Typography, TextField, Button, Grid
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//hook form-form
import { useForm } from "react-hook-form";
//yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
//interface
import { UserRegister } from "../../core/interface/user/userRegister.interface";
//page_scss
import "./Register.page.scss";
import { useStyles } from "../../core/config/theme";
//redux
import { useDispatch } from 'react-redux';
import { postUserRegister } from "../../core/services/userManager.service";
import { userRegisterAction } from "../../core/redux/actions/userManager.action";

const SignUpSchema = yup.object().shape({
    firstName: yup.string().trim().required("(*) Please enter you first name"),
    lastName: yup.string().trim().required("(*) Please enter your last name"),
    user: yup.string().trim().required("(*) Please enter your user").matches(/^\S*$/, "(*) The user does not allow empty no-space"),
    password: yup.string().trim().required("(*) Please enter your password"),
    passwordConfirmation: yup.string().required("(*) Please enter your confirm password").oneOf([yup.ref('password'), ''], 'Passwords must match'),
    email: yup.string().trim().email("(*) Invalid email address").required("(*) Please enter your password email"),
    phoneNumber: yup.string().trim().required("(*) Please enter phone number").matches(/((09|03|07|08|05)+([0-9]{8})\b)/, "(*) The phone number not valid").max(10, "(*) The phone number not valid")
});


const RegisterPage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    //Check status user and password when entering
    const { register, handleSubmit, errors } = useForm<UserRegister>({
        resolver: yupResolver(SignUpSchema),
    });

    //Submit user register 
    const onSubmit = (data: UserRegister) => {
        postUserRegister(data)
            .then(res => {
                dispatch(userRegisterAction(res.data));
                alert(" Sign up successful! ");
                return <Redirect to='/login' />
            })
            .catch(err => {
                console.log({ ...err });
            })
    }

    return (
        <div className="register">
            <img src="/access/images/bg-project.jpg" alt="" />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h3">
                    Sign up
                </Typography>
                <form
                    noValidate
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputRef={register}
                                autoFocus
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="outlined-basic"
                                label="First Name"
                                error={!!errors.firstName}
                                helperText={errors.firstName ? errors.firstName.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputRef={register}
                                variant="outlined"
                                fullWidth
                                id="outlined-basic"
                                label="Last Name"
                                name="lastName"
                                error={!!errors.lastName}
                                helperText={errors.lastName ? errors.lastName.message : ""}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        inputRef={register}
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        label="Username or phone number"
                        variant="outlined"
                        name="user"
                        error={!!errors.user}
                        helperText={errors.user ? errors.user.message : ""}
                    />
                    <TextField
                        inputRef={register}
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />
                    <TextField
                        inputRef={register}
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        name="passwordConfirmation"
                        error={!!errors.passwordConfirmation}
                        helperText={errors.passwordConfirmation ? errors.passwordConfirmation.message : ""}
                    />
                    <TextField
                        inputRef={register}
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        label="Email Address"
                        variant="outlined"
                        name="email"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                    />
                    <TextField
                        inputRef={register}
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        label="Phone Number"
                        variant="outlined"
                        name="phoneNumber"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ padding: "15px", margin: '10px 0 6px' }}
                    >
                        Sign Up
                        </Button>
                    <div className="form-register" style={{ color: 'black' }}>
                        Already a member? &nbsp;
                         <NavLink className="nav-link" to="/login">
                            Log in
                         </NavLink>
                    </div>
                </form>
            </div>
        </div>

    );
}
export default RegisterPage;



