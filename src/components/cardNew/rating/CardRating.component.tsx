import * as React from 'react';
//scss
import './CardRating.component.scss'
//interface
import { ReviewFilm } from '../../../core/interface/film/reviewFilm.interface';

export interface CardRatingProps {
    card: ReviewFilm
}
export default function CardRatingReviewComponent(props: CardRatingProps) {
    const { card } = props;
    return (
        <div className="card-rating">
            <img src={card.image} alt="" />
            <h1>{card.rate}</h1>
            <div className="card-rating__detail">
                <h2>{card.name}</h2>
                <div></div>
                <h3>by <span style={{ color: 'var(--color-yellow)' }}>Cybersoft</span> </h3>
            </div>
        </div>
    )
}