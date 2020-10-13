import * as React from 'react';
import { Fragment } from 'react';
// Scss
import './ContactUs.page.scss';
// Mat
import { TextareaAutosize, Input, FormControlLabel } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import Radio from '@material-ui/core/Radio/Radio';
import SendIcon from '@material-ui/icons/Send';
import FileCopyIcon from '@material-ui/icons/FileCopy';
// Component
import FooterComponent from '../../../common/footer/Footer.component';

export interface ContactUsPageProps { }
export interface ContactUsPageState {
    tabStatus: 'support' | 'ticket' | 'other';
}

export default class ContactUsPage extends React.Component<ContactUsPageProps, ContactUsPageState> {
    constructor(props: ContactUsPageProps) {
        super(props);

        this.state = {
            tabStatus: 'support',
        }
    }
    
    render = () => {
        let bindNavView;
        if (this.state.tabStatus === 'support') {
            bindNavView =
                <div className="tabs__support">
                    <div>
                        <h4>Subject</h4>
                        <Input placeholder="support, report, ..." />
                        <div></div>
                    </div>
                    <div>
                        <h4>Your email</h4>
                        <Input placeholder="youremail@gmail.com" />
                    </div>
                    <div>
                        <h4>Message</h4>
                        <TextareaAutosize aria-label="minimum height" rowsMin={5} placeholder="drop us a line" style={{ outline: 'none', padding: '6px 3px 7px' }} />
                    </div>
                    <div className="btn btn-wrapper">
                        <div></div>
                        <button className="btn__attach">
                            <FileCopyIcon fontSize="small"></FileCopyIcon> &nbsp;
                            Attach file
                        </button>
                        <button className="btn__send" >Send &nbsp;
                            <SendIcon fontSize="small"></SendIcon>
                        </button>
                    </div>
                </div>
        } else if (this.state.tabStatus === 'ticket') {
            bindNavView =
                <div className="tabs__ticket">
                    <div>
                        <h4>Subject</h4>
                        <Input placeholder="ticket return" disabled={true} />
                        <div></div>
                    </div>
                    <div>
                        <h4>Your name</h4>
                        <Input placeholder="" />
                        <div></div>
                    </div>
                    <div>
                        <h4>Phone number</h4>
                        <Input placeholder="" />
                        <div></div>
                    </div>
                    <div>
                        <h4>Email Address</h4>
                        <Input placeholder="" />
                    </div>
                    <div>
                        <h4>Address</h4>
                        <Input placeholder="" />
                        <div></div>
                    </div>
                    <div className="tabs__ticket-detail">
                        <h3>I am a &nbsp; : </h3>
                        <ul>
                            <RadioGroup name="client" >
                                <FormControlLabel value="1" control={<Radio color="primary" />} label="Donor" color='secondary' />
                                <FormControlLabel value="2" control={<Radio color="primary" />} label="Season Subscriber" />
                                <FormControlLabel value="3" control={<Radio color="primary" />} label="Single Ticket Buyer" />
                            </RadioGroup>
                        </ul>
                    </div>
                    <div className="btn btn-wrapper">
                        <div></div>
                        <button className="btn__send" >Send &nbsp;
                            <SendIcon fontSize="small"></SendIcon>
                        </button>
                        <div></div>

                    </div>
                </div>
        } else {
            bindNavView =
                <div className="tabs__other scrollbar">
                    <div className="force-overflow">
                        <div>
                            <h5>WHERE CAN I FIND THE NEW SCHEDULE?</h5>
                            <p>When the schedule and shows are finalized, we will make an announcement, and you will find the new run dates on the website at ...</p>
                        </div>
                        <div>
                            <h5>WHAT HAPPENS TO MY TICKETS?</h5>
                            <p>Your tickets will be automatically transferred into the corresponding day and time of the new run dates.</p>
                        </div>
                        <div>
                            <h5>WHAT IF I PAID WITH CASH OR CHECK?</h5>
                            <p>We will also process these orders like the credit card, but will mail you a check within 30 to 90 days. Please make sure that we have your correct address on the Ticket Return Form.</p>
                        </div>
                        <div>
                            <h5>WHAT HAPPENS TO MY TICKETS?</h5>
                            <p>Your tickets will be automatically transferred into the corresponding day and time of the new run dates.</p>
                        </div>
                        <div>
                            <h5>WHAT HAPPENS TO MY TICKETS?</h5>
                            <p>Your tickets will be automatically transferred into the corresponding day and time of the new run dates.</p>
                        </div>
                        <div>
                            <h5>WHERE CAN I FIND THE NEW SCHEDULE?</h5>
                            <p>When the schedule and shows are finalized, we will make an announcement, and you will find the new run dates on the website at ...</p>
                        </div>
                        <div>
                            <h5>WHAT HAPPENS TO MY TICKETS?</h5>
                            <p>Your tickets will be automatically transferred into the corresponding day and time of the new run dates.</p>
                        </div>
                    </div>

                </div>
        }

        return (
            <Fragment>
                <div className="contact">
                    <img src="/film/caribbean.jpg" alt=""/>
                    <div className="overlay"></div>
                    <div className="tabs">
                        <h1>Contact us</h1>
                        <div className="tabs__toggle">
                            <li onClick={() => {
                                this.setState({ tabStatus: 'support' })
                            }}
                                className={
                                    this.state.tabStatus === 'support' ? '--active' : ''
                                }
                            >
                                Support
                            </li>
                            <li onClick={() => {
                                this.setState({ tabStatus: 'ticket' })
                            }}
                                className={
                                    this.state.tabStatus === 'ticket' ? '--active' : ''
                                }
                            >
                                Ticket return</li>
                            <li onClick={() => {
                                this.setState({ tabStatus: 'other' })
                            }}
                                className={
                                    this.state.tabStatus === 'other' ? '--active' : ''
                                }
                            >
                                FAQs</li>
                        </div>
                        <div className="tabs__view">
                            {bindNavView}
                        </div>
                    </div>
                </div>
                <FooterComponent></FooterComponent>

            </Fragment >
        )
    }
}