import * as React from 'react';
import { Fragment } from 'react';
// Scss
import './Nav.component.scss';
// Mat
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import ListIcon from '@material-ui/icons/List';
//redux
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export interface NavComponentProps {
    userlogin: string;
}

export interface NavComponentState {
    navStatus: 'menu' | 'info';
}

class NavComponent extends React.Component<NavComponentProps, NavComponentState> {
    constructor(props: NavComponentProps) {
        super(props);
        this.state = {
            navStatus: 'menu',
        }
    }

    toogleNavStatus = () => {
        const newNavStatus = this.state.navStatus === 'menu' ? 'info' : 'menu';
        this.setState({ navStatus: newNavStatus });
    }
    // State User Login
    renderLogin = () => {
        if (this.props.userlogin !== "") {
            return (
                <Fragment>

                    <div>
                        <AccountCircleIcon />&nbsp;<span>{this.props.userlogin}</span>
                    </div>
                    <div onClick={this.logout}>
                        <span>Logout</span> &nbsp;<ExitToAppIcon />
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Button color="primary" variant="outlined">
                    <NavLink to="/login" className="nav__item" style={{ color: 'var(--color-constrant-black' }}>
                        <p>Sign in</p>
                    </NavLink>
                </Button>
            </Fragment>

        );
    };

    logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        let bindNavView;
        if (this.state.navStatus === 'info') {
            bindNavView =
                <div className="nav__userinfo">
                    {this.renderLogin()}
                </div>;
        } else {
            bindNavView =
                <div className="nav__menu">
                    <div>
                        <NavLink exact to="/" className="nav__item" activeClassName="nav__item--active">
                            <p>Trending now</p>
                        </NavLink>
                        <NavLink to="/showtimes" className="nav__item" activeClassName="nav__item--active">
                            <p>Showtimes</p>
                        </NavLink>
                        <NavLink to="/comingsoon" className="nav__item" activeClassName="nav__item--active">
                            <p>Coming soon</p>
                        </NavLink>
                        <NavLink to="/reviews" className="nav__item" activeClassName="nav__item--active">
                            <p>New and reviews</p>
                        </NavLink>
                        <NavLink to="/contactus" className="nav__item" activeClassName="nav__item--active">
                            <p>Contact us</p>
                        </NavLink>
                    </div>
                    <div></div>
                </div>;
        }
        return (
            <div className="nav">
                <div className="nav__toggle" onClick={this.toogleNavStatus}>
                    <Icon fontSize="large">menu</Icon>
                </div>
                <div className="nav__view">
                    {bindNavView}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        userlogin: state.userManagerReducer.user,
    }
}
export default connect(mapStateToProps)(NavComponent);
