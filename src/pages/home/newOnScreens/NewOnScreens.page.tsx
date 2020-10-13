import * as React from 'react';
// Scss
import './NewOnScreens.page.scss';
import '../../../components/trailerDialog/TrailerDialog.component.scss';
// Mat
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// Interface
import { IntroMovie } from '../../../core/interface/film/introFilm.class';
// Component
import FullSliderComponent from '../../../components/fullSlider/FullSlider.component';
//Redux
import { connect } from 'react-redux';

export interface NewOnScreensPageProps {
    movies: [];
}
export interface NewOnScreensPageState {
    properties: IntroMovie[];
    property: IntroMovie | null;
}

class NewOnScreensPage extends React.Component<NewOnScreensPageProps, NewOnScreensPageState> {

    constructor(props: NewOnScreensPageProps) {
        super(props);
        this.state = {
            properties: [],
            property: null,
        }
    }

    componentDidMount() {
        const newIntroMovies: IntroMovie[] = this.props.movies.slice();
        /* Taking random 5 element as the trailer trending */
        const newIntroMoviesRandom: IntroMovie[] = [];
        if (newIntroMovies.length >= 15) {
            for (let i = 0; i < 5; i++) {
                let indexRandom = Math.floor(Math.random() * newIntroMovies.length);
                newIntroMoviesRandom.push(newIntroMovies[indexRandom]);
                newIntroMovies.splice(indexRandom, 1);
                //sort index newIntroMoviesRandom
                newIntroMoviesRandom[i].index = i;
            }
        }
        this.setState(
            {
                properties: newIntroMoviesRandom,
                property: newIntroMoviesRandom[0],
            }
        )
    }
    componentWillUnmount() {
        const newIntroMoviesUnMount: IntroMovie[] = this.props.movies;
        for (let i = 0; i < newIntroMoviesUnMount.length; i++) {
            newIntroMoviesUnMount[i].index = i;
        }
    }

    nextProperty = () => {
        if (this.state.property === null) { return };
        const newIndex = this.state.property.index === this.state.properties.length - 1 ? 0 : this.state.property.index + 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    prevProperty = () => {
        if (this.state.property === null) { return };
        const newIndex = this.state.property.index === 0 ? this.state.properties.length - 1 : this.state.property.index - 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    selectProperty = (index: number) => {
        this.setState({ property: this.state.properties[index] });
    }

    render = () => {
        const { properties, property } = this.state;

        return (
            property !== null &&
            <div className="new-on-screens">
                <div className="new-on-screens__slider"
                    style={{
                        'transform': `translateY(-${property.index * (100 / properties.length)}%)`
                    }}
                >
                    {
                        properties.map((property, index) => <FullSliderComponent key={index} slider={property} showTimes={[]}></FullSliderComponent>)
                    }
                </div>
                <div className="new-on-screens__control">
                    <div>
                        <button onClick={this.prevProperty}>
                            <KeyboardArrowUpIcon />
                        </button>
                    </div>
                    <div>
                        <button onClick={this.nextProperty}>
                            <KeyboardArrowDownIcon />
                        </button>
                    </div>
                </div>
                <div className="new-on-screens__dot">
                    {
                        [...Array(properties.length)].map((i, index) =>
                            <div
                                className={index === property.index ? 'active' : ''}
                                key={index}
                                onClick={() => this.selectProperty(index)}>
                            </div>)
                    }
                </div>
                <div className="video-background" >
                    <div className="video-foreground">
                        <iframe
                            title="trailer-trending"
                            src={property.trailerLink + '?playlist=peSfCy7HFrM&loop=1&start=10&end=50&autoplay=1;mute=0;controls=0'}
                            allow='autoplay; encrypted-media'
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    movies: state.movieManagerReducer.movies,
})

export default connect(mapStateToProps)(NewOnScreensPage);
