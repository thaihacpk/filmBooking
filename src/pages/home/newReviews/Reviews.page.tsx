import * as React from 'react';
import { Fragment } from 'react';
// Scss
import './Reviews.page.scss';
// Interface
import { ReviewFilm } from '../../../core/interface/film/reviewFilm.interface';
// Data
import { reviewFilmData } from "../../../core/interface/film/reviewFirm.data";
// Component
import CardNewReviewComponent from '../../../components/cardNew/new/CardNew.component';
import CardRatingReviewComponent from '../../../components/cardNew/rating/CardRating.component';

export interface ReviewsPageProps {
    newProperties: ReviewFilm;
}

export interface ReviewsPageState {
    properties: ReviewFilm[];
}

export default class ReviewsPage extends React.Component<ReviewsPageProps, ReviewsPageState> {
    constructor(props: ReviewsPageProps) {
        super(props);

        this.state = {
            properties: reviewFilmData,
        }
    }
    render = () => {
        const { properties } = this.state;
        const newProperties = properties.map(res => res)
        console.log("newProperties", newProperties);

        return (
            <Fragment>
                <div className="reviews">
                    <img src="/film/supperman.jpg" alt="" />
                    <div className="overlay"></div>
                    <div className="reviews__content">
                        <div>
                            <h1>News</h1>
                            <div className="reviews__scrollbar">
                                <div className="force-overflow">
                                    <div className="reviews__news">
                                        <div className="reviews__news-row">
                                            <CardNewReviewComponent card={properties[0]} style={`row`}></CardNewReviewComponent>
                                        </div>
                                        <div className="reviews__news-col">
                                            {newProperties.splice(1).map((newProperties, i) => <CardNewReviewComponent key={i} card={newProperties} style={`col`}></CardNewReviewComponent>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1>Rating</h1>
                            <div className="reviews__scrollbar">
                                <div className="force-overflow">
                                    {properties.map((properties, i) => <CardRatingReviewComponent key={i} card={properties}></CardRatingReviewComponent>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}