import * as React from 'react';
//scss
import './CardNew.component.scss'
//mat
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
//interface
import { ReviewFilm } from '../../../core/interface/film/reviewFilm.interface';
import { BottomNavigationAction } from '@material-ui/core';


export interface CardNewProps {
    card: ReviewFilm,
    style: string,

}
export default function CardNewReviewComponent(props: CardNewProps) {
    const { card, style } = props;

    if (style === 'row') {
        return (
            <div className="card-row">
                <img src={card.image} alt="" />
                <div className="card-row__content">
                    <div>
                        <h5>{card.date}</h5>
                        <h3>{card.title}</h3>
                        <p>{card.content}</p>
                    </div>
                    <ul style={{ display: 'flex', alignItems: "center", justifyContent: 'space-around' }}>
                        <li>
                            <BottomNavigationAction icon={<FavoriteIcon />} style={{ padding: '0', color: 'yellow' }} />{card.like}
                            <BottomNavigationAction icon={<CommentIcon />} style={{ padding: '0', color: 'yellow' }} />{card.comment}
                        </li>
                        <li>
                            <BottomNavigationAction icon={<ShareIcon />} style={{ padding: '0', color: 'yellow' }} /> Share
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    return (
        <div className="card-col">
            <img src={card.image} alt="" />
            <div className="card-col__content">
                <h5>{card.date}</h5>
                <h3>{card.title}</h3>
                <p>{card.content}</p>
                <ul>
                    <li>
                        <BottomNavigationAction icon={<FavoriteIcon />} style={{ padding: '0', color: 'yellow' }} />{card.like}
                        <BottomNavigationAction icon={<CommentIcon />} style={{ padding: '0', color: 'yellow' }} />{card.comment}
                    </li>
                    <li>
                        <BottomNavigationAction icon={<ShareIcon />} style={{ padding: '0', color: 'yellow' }} /> Share
                    </li>
                </ul>
            </div>
        </div>
    )
}