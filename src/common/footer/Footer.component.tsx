import * as React from 'react';
import './Footer.component.scss';
import { NavLink } from 'react-router-dom';
//mat
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';

export interface FooterComponentProps {
}

export interface FooterComponentState {
}

export default class FooterComponent extends React.Component<FooterComponentProps, FooterComponentState> {
    constructor(props: FooterComponentProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <div className="footer">
                <div className="footer__films">
                    <h4>Films</h4>
                    <ul>
                        <li>
                            <NavLink to="/">Trending now</NavLink>
                        </li>
                        <li>
                            <NavLink to="/showtimes">Showtimes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/comingsoon">Coming soon</NavLink>
                        </li>
                        <li>
                            <NavLink to="/reviews">New and reviews</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="footer__community">
                    <h4>Community</h4>
                    <ul>
                        <li>
                            <NavLink to="/register">Create account</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Manage Account</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">My profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/message">Messages</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="footer__support">
                    <h4>Support</h4>
                    <ul>
                        <li>
                            <NavLink to="/contactus">General support</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contactus">Contact us</NavLink>
                        </li>
                    </ul>

                </div>
                <div className="footer__links">
                    <h4>Follow us on</h4>
                    <ul>
                        <li>
                            <NavLink to="/">
                                <TwitterIcon fontSize="small"></TwitterIcon>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                <FacebookIcon fontSize="small"></FacebookIcon>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                <YouTubeIcon fontSize="small"></YouTubeIcon>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                <InstagramIcon fontSize="small"></InstagramIcon>
                            </NavLink>
                        </li>
                    </ul>
                    <p style={{ color: 'white' }}>Copyright © Your Website 2020.</p>
                </div>

            </div>
        );
    }
}
