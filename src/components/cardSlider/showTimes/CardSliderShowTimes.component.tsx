import * as React from 'react';
import { NavLink } from 'react-router-dom';
// Scss
import './CardSliderShowTimes.component.scss';
// Interface
import { IntroMovie } from '../../../core/interface/film/introFilm.class';
// Mat
import Icon from '@material-ui/core/Icon';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
// Services
import { deleteMovie, getMovieDetail } from '../../../core/services/movieManager.service';
//moment
import moment from 'moment';

export interface CardSliderProps {
    slider: IntroMovie;
    onOpenTrailer: (url: string) => void;
    onOpenForm: (item: IntroMovie) => void;
    onOpenAlert: () => void;
    isAdmin: boolean;
}

export default function CardSliderShowTimesComponent(props: CardSliderProps) {
    const { slider, onOpenTrailer, onOpenForm, onOpenAlert, isAdmin } = props;
    const [getShowTimes, setShowTimes] = React.useState([]);

    const handleOpenTrailer = () => {
        onOpenTrailer(slider.trailerLink);
    };

    const handleOpenForm = () => {
        onOpenForm(slider);
    }
    React.useEffect(() => {
        doGetMovieDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const doGetMovieDetail = () => {
        getMovieDetail(slider._id)
            .then(result => setShowTimes(result.data.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim))
            .catch(err => console.log({ ...err }))
    }
    const deleteItemMovie = () => {
        deleteMovie(slider._id)
            .then(res => {
                onOpenAlert();
                window.location.reload();
            })
            .catch(err => {
                console.log({ ...err });
            })
    }


    return (
        <div className="card-slider-showTimes">
            {isAdmin &&
                <div className="control">
                    <div>
                        <button onClick={deleteItemMovie}>
                            <DeleteForeverIcon />
                        </button>
                    </div>
                    <div>
                        <button onClick={handleOpenForm}>
                            <EditIcon />
                        </button>
                    </div>
                </div>

            }
            <img src={slider.image} alt="" />
            <div className="card-slider-showTimes__content">
                <h4>
                    {
                        slider.types.join(' / ')
                    }
                </h4>
                <h2>{slider.name}</h2>
                <div className="card-slider-showTimes__detail">
                    <div className="card-slider-showTimes__ticket-wrapper">
                        <h4>Buy ticket</h4>
                        {
                            getShowTimes.slice(2, 6).map((lichChieu: any = [], index: number) => {
                                return (
                                    <div className="card-slider-showTimes__ticket-btn" key={index}>
                                        <NavLink key={lichChieu.maLichChieu} exact to={`/seat/${lichChieu.maLichChieu}`}>
                                            {
                                                <h3> {moment(lichChieu.ngayChieuGioChieu).format('HH:mm')}</h3>
                                            }</NavLink>
                                    </div>
                                )
                            })
                        }
                        <div className="clear"></div>
                    </div>
                    <div className="card-slider-showTimes__btn-wrapper">
                        <div className="card-slider-showTimes__btn" onClick={handleOpenTrailer}>
                            <div><Icon>play_arrow</Icon></div>
                            <p>View trailer</p>
                        </div>
                        <div className="card-slider-showTimes__btn ">
                            <NavLink exact to={`/movie-detail/${slider._id}`}>
                                <Icon>more</Icon>
                            </NavLink>
                            <p>More detail</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
