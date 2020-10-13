import * as React from 'react';
// Scss
import './CardSliderComingSoon.component.scss';
// Interface
import { IntroMovie } from '../../../core/interface/film/introFilm.class';
// Mat
import Icon from '@material-ui/core/Icon';
import { NavLink } from 'react-router-dom';

export interface CardSliderComingSoonProps {
    slider: IntroMovie;
    onOpenTrailer: (url: string) => void;
}

export default function CardSliderComingSoonComponent(props: CardSliderComingSoonProps) {
    const { slider, onOpenTrailer } = props;

    const handleOpenTrailer = () => {
        onOpenTrailer(slider.trailerLink);
    };

    return (
        <div className="card-slider-comingSoon">
            <img src={slider.image} alt="" />
            <div className="card-slider-comingSoon__trailer-btn" onClick={handleOpenTrailer}>
                <div><Icon>play_arrow</Icon></div>
                    View trailer
            </div>
            <div className="card-slider-comingSoon__content">
                <h4>
                    {
                        slider.types.join(' / ')
                    }
                </h4>
                <h2>{slider.name}</h2>
                <div className="card-slider-comingSoon__detail-btn">
                    <NavLink exact to={`/movie-detail/${slider._id}`}>
                        <Icon>more</Icon>
                    </NavLink>
                    <p>More detail</p>
                </div>
            </div>
        </div>
    );
}
