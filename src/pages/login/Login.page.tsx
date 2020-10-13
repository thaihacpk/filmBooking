import * as React from "react";
import { NavLink, Redirect } from "react-router-dom";
//Material UI
import {
    Avatar, Typography, TextField, Button, FormHelperText
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//hook form-form
import { useForm } from "react-hook-form";
//yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
//interface
import { UserLogin } from "../../core/interface/user/userLogin.interface";
//page_scss
import "./Login.page.scss";
import { useStyles } from "../../core/config/theme";
//services
import { postUserLogin } from '../../core/services/userManager.service';
//setting
import { userLogin, token } from '../../core/config/setting';
//redux
import { userLoginAction } from '../../core/redux/actions/userManager.action';
import { useDispatch } from 'react-redux';


const SignInSchema = yup.object().shape({
    user: yup.string().trim().required("(*) Please enter your user"),
    password: yup.string().trim().required("(*) Please enter your password"),
});

const LoginPage = (props: any) => {
    const dispatch = useDispatch();
    //css
    const classes = useStyles();
    //state
    let [stateSubmit, setStateSubmit] = React.useState({
        _message: '',
    })

    //Check status user and password when entering
    const { register, handleSubmit, errors } = useForm<UserLogin>({
        resolver: yupResolver(SignInSchema),
    });
    
    const onSubmit = (data: UserLogin) => {
        postUserLogin(data)
            .then(res => {
                //add info user to localStorage
                localStorage.setItem(userLogin, JSON.stringify(res.data));
                //add token user to localStorage
                localStorage.setItem(token, res.data.accessToken);
                dispatch(userLoginAction(res.data.taiKhoan));
                props.history.push('/');
            })
            .catch(err => {
                console.log({ ...err }.response.data);
                setStateSubmit({ _message: 'The account or password is incorrect' });
            })
    };
    //check signed out

    if (localStorage.getItem(userLogin)) {
        return <Redirect to='/' />
    }
    return (
        <div className="login">
            <img src="/access/images/bg-project.jpg" alt="" />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h3">
                    Sign in
            </Typography>
                <form
                    noValidate
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        inputRef={register}
                        fullWidth
                        autoFocus
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
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ padding: "15px", margin: '16px 0 6px' }}
                    >
                        Sign In
                        </Button>
                    <FormHelperText error={!!stateSubmit._message}>{stateSubmit._message}</FormHelperText>
                    <div>
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
export default LoginPage;