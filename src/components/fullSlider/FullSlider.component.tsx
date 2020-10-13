import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// Scss
import './FullSlider.component.scss';
import '../fullSlider/FullSlider.component.scss';
// Interface
import { IntroMovie } from '../../core/interface/film/introFilm.class';
// Mat
import Rating from '@material-ui/lab/Rating';
// Moment
import moment from 'moment';
// Services
import { getMovieDetail } from '../../core/services/movieManager.service';

export interface FullSliderProps {
    slider: IntroMovie;
    showTimes: [];
}
export default function FullSliderComponent(props: FullSliderProps) {
    const { slider, showTimes } = props;
    //Initial state
    const [getShowTimes, setShowTimes] = useState<any>(showTimes);

    useEffect(() => {
        doGetMovieDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const doGetMovieDetail = () => {
        getMovieDetail(slider._id)
            .then(result => setShowTimes(result.data.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim))
            .catch(err => console.log({ ...err }))
    }
    return (
        <Fragment>
            <div className="full-slider">
                <div className="full-slider__content">
                    <h3>
                        {
                            slider.types.join(' / ')
                        }
                    </h3>
                    <div>
                        <div className="full-slider__trailer-btn">
                            Reviews
                        <Rating className="full-slider__rating" name="half-rating-read" size="large" defaultValue={1} precision={0.5} readOnly max={1} />
                            <p>{slider.rate}/10</p>
                        </div>
                        <h1>{slider.name}</h1>
                    </div>
                    <div>
                        <h2>Buy now</h2>
                        <div className="full-slider__ticket-wrapper">
                            {
                                getShowTimes.slice(0, 6).map((lichChieu: any = [], index: number) => {
                                    return (
                                        <div className="full-slider__ticket-btn" key={index}>
                                            <NavLink key={lichChieu.maLichChieu} exact to={`/seat/${lichChieu.maLichChieu}`}>
                                                {
                                                    <h2> {moment(lichChieu.ngayChieuGioChieu).format('HH:mm')}</h2>
                                                }</NavLink>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}