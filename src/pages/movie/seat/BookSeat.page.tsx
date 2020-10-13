import * as React from 'react';
import { Fragment } from 'react';
//scss
import './BookSeat.page.scss';
//mat 
import WeekendIcon from '@material-ui/icons/Weekend';
//interface
import { InfoRoomCinema } from '../../../core/interface/film/infoRoom.class';
//services
import { getMovieTicketList } from '../../../core/services/movieManager.service';
import { postUserBookTicket } from './../../../core/services/userManager.service';

export interface BookSeatPageProps {
    match: any
    daDat: boolean;
    tenPhim: string;
}
export interface BookSeatPageState {
    property: InfoRoomCinema | null;
    selectedSeats: [] | any;
    digestSeats: {} | any;
}
export default class BookSeatPage extends React.Component<BookSeatPageProps, BookSeatPageState> {

    constructor(props: BookSeatPageProps) {
        super(props);

        this.state = {
            property: null,
            selectedSeats: [],
            digestSeats: {
                normal: [],
                vip: [],
            }
        }
    }

    componentDidMount = () => {
        this.doGetMovieTicketList();
    }

    doGetMovieTicketList = () => {
        const { id } = this.props.match.params;
        getMovieTicketList(id)
            .then(result => {
                const { danhSachGhe, thongTinPhim } = result.data;
                const infoRoomCinema: InfoRoomCinema = new InfoRoomCinema(danhSachGhe, thongTinPhim);
                //classify seat beetwen vip/normal
                infoRoomCinema.seats.forEach((item: any = {}) => {
                    if (item.loaiGhe === "Thuong") {
                        this.state.digestSeats.normal.push(item);
                    } else {
                        this.state.digestSeats.vip.push(item);
                    }
                })
                this.setState({ property: infoRoomCinema });
            })
            .catch((err: any) => {
                console.log({ ...err });
            })
    }

    renderSeatsVip = () => {
        return this.state.digestSeats.vip.map((seat: any = {}, index: number) => {
            if (index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 19 || index === 20 || index === 21 || index === 22 || index === 37 || index === 38) { return null }
            return (
                <Fragment key={index}>
                    {this.renderSeat(seat.daDat, seat)}
                    {(index + 1) % 18 === 0 ? <br /> : ''}
                </Fragment>
            )
        })
    }

    renderSeatsNormal = () => {
        return this.state.digestSeats.normal.map((seat: any = {}, index: number) => {
            if (index === 0 || index === 1) { return null }
            return (
                <Fragment key={index}>
                    {this.renderSeat(seat.daDat, seat)}
                    {(index + 1) % 21 === 0 ? <br /> : ''}
                </Fragment>
            )
        })
    }

    renderSeat = (selected: boolean, seat: any = {}) => {
        const { selectedSeats } = this.state;
        if (selected) {
            return (
                <button className="selected" disabled >
                    <WeekendIcon fontSize="large" />
                </button>
            )
        } else {
            let seatSelected = '';
            let index = selectedSeats.findIndex((item: any) => item.stt === seat.stt);
            if (index !== -1) {
                seatSelected = 'currentSelect';
            }
            //Check boolean seat vip
            let css_seatVip = '';
            if (seat.loaiGhe === 'Vip') {
                css_seatVip = 'VIP';
            }
            return (
                <button className={`${seatSelected} ${css_seatVip} `} onClick={() => {
                    this.bookSeat(seat);
                }}>
                    <WeekendIcon fontSize="large" />
                </button>
            )
        }
    }

    bookSeat = (seat: any = {}) => {
        let { selectedSeats } = this.state;
        let index = selectedSeats.findIndex((item: any = {}) => item.stt === seat.stt); //Check selected seat
        if (index === -1) {
            selectedSeats = [...this.state.selectedSeats, seat]; // add seat
        } else {
            selectedSeats.splice(index, 1);// remove seat
        }
        this.setState({ selectedSeats: [...selectedSeats] });
    }

    renderChoiceCurrentSeat = () => {
        return <Fragment>
            {this.state.selectedSeats.map((item: any = {}, index: number) => {
                if (item.loaiGhe === 'Vip') {
                    return <WeekendIcon style={{ color: '#028c6a' }} key={index} />
                }
                return <WeekendIcon style={{ color: 'grey' }} key={index} />
            })}
        </Fragment>
    }

    bookTickets = () => {
        let ticket = {
            "maLichChieu": this.props.match.params.id,
            "danhSachVe": this.state.selectedSeats,
            "taiKhoanNguoiDung": JSON.parse(localStorage.getItem("userLogin") || "{}").taiKhoan,
        }
        if (this.state.selectedSeats === undefined || this.state.selectedSeats.length === 0) {
            alert("(*) Please select a seat");
        } else {
            postUserBookTicket(ticket)
                .then(res => {
                    alert("Successful booking !");
                    window.location.reload();
                })
                .catch(err => {
                    console.log({ ...err });
                })
        }
    }

    render = () => {
        return (
            <div className="book-seat">
                <img src="/film/banner.jpg" alt="" />
                <div className="overlay"></div>
                <div className="book-seat__content">
                    <div className="book-seat__ticket-btn" onClick={() => {
                        this.bookTickets();
                    }}><h2> Buy now</h2>
                    </div>
                    <ul className="book-seat__tutorial" style={{ height: '24px' }}>
                        <li>
                            <h3 style={{ color: 'white' }}>Your choice : &nbsp;</h3>
                        </li>
                        <li>
                            {this.renderChoiceCurrentSeat()}
                        </li>
                        <li>
                            <h3 style={{ color: 'white', margin: '0 25px' }}> Total : &nbsp;
                                {this.state.selectedSeats.reduce((tongTien: any, gheDangDat: any, index: number) => {
                                return tongTien += gheDangDat.giaVe;
                            }, 0)}
                            </h3>
                        </li>
                    </ul>
                    <ul className="book-seat__tutorial">
                        <li className="book-seat__tutorial-item"><WeekendIcon style={{ color: 'grey' }} /><span>Classic</span></li>
                        <li className="book-seat__tutorial-item"><WeekendIcon style={{ color: '#028c6a' }} /><span>VIP</span></li>
                        <li className="book-seat__tutorial-item"><WeekendIcon style={{ color: 'yellow' }} /><span>Selected Seat</span></li>
                        <li className="book-seat__tutorial-item"><WeekendIcon style={{ opacity: '0.1', color: 'grey' }} /><span>Reserved Seat</span></li>
                        <li className="book-seat__tutorial-item"><WeekendIcon style={{ color: 'grey' }} /><WeekendIcon style={{ color: '#028c6a' }} /><span>Empty Seat</span></li>

                    </ul>
                    {this.renderSeatsVip()}
                    {this.renderSeatsNormal()}
                    <div className="book-seat__screen">
                        <h2>Screen this way</h2>
                    </div>
                </div>
            </div >
        )
    }
}